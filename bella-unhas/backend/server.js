const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// HEALTH
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "conectado", ts: new Date() });
  } catch (err) {
    res.status(500).json({ ok: false, db: "erro", error: err.message });
  }
});

// SERVICOS
app.get("/api/servicos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servicos ORDER BY nome");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/servicos", async (req, res) => {
  const { nome, preco, duracao_minutos, descricao } = req.body;
  if (!nome || !preco) return res.status(400).json({ error: "nome e preco sao obrigatorios" });
  try {
    const [result] = await pool.query(
      "INSERT INTO servicos (nome, preco, duracao_minutos, descricao) VALUES (?, ?, ?, ?)",
      [nome, preco, duracao_minutos || null, descricao || null]
    );
    res.status(201).json({ id: result.insertId, nome, preco });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// CLIENTES
app.get("/api/clientes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes ORDER BY nome");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/clientes", async (req, res) => {
  const { nome, telefone, email } = req.body;
  if (!nome || !telefone) return res.status(400).json({ error: "nome e telefone sao obrigatorios" });
  try {
    const [[existing]] = await pool.query("SELECT id FROM clientes WHERE telefone=?", [telefone]);
    if (existing) return res.json({ id: existing.id, exists: true });
    const [result] = await pool.query(
      "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)",
      [nome, telefone, email || null]
    );
    res.status(201).json({ id: result.insertId, nome, telefone });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// RESERVAS
app.get("/api/reservas", async (req, res) => {
  try {
    const { data, status } = req.query;
    let sql = `SELECT r.*, c.nome AS cliente_nome, c.telefone, s.nome AS servico_nome, s.preco
               FROM reservas r
               JOIN clientes c ON r.cliente_id = c.id
               JOIN servicos s ON r.servico_id = s.id WHERE 1=1`;
    const params = [];
    if (data)   { sql += " AND r.data = ?";   params.push(data); }
    if (status) { sql += " AND r.status = ?"; params.push(status); }
    sql += " ORDER BY r.data, r.horario";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/reservas", async (req, res) => {
  const { nome, telefone, email, servico_id, data, horario, observacoes } = req.body;
  if (!nome || !telefone || !servico_id || !data || !horario)
    return res.status(400).json({ error: "Campos obrigatorios: nome, telefone, servico_id, data, horario" });
  try {
    const [[conflict]] = await pool.query(
      "SELECT id FROM reservas WHERE data=? AND horario=? AND status != 'cancelado'", [data, horario]
    );
    if (conflict) return res.status(409).json({ error: "Horario ja ocupado" });

    let clienteId;
    const [[existing]] = await pool.query("SELECT id FROM clientes WHERE telefone=?", [telefone]);
    if (existing) { clienteId = existing.id; }
    else {
      const [r] = await pool.query("INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)", [nome, telefone, email || null]);
      clienteId = r.insertId;
    }

    // Busca o nome do serviço para o e-mail
    const [[servico]] = await pool.query("SELECT nome, preco FROM servicos WHERE id=?", [servico_id]);

    const [result] = await pool.query(
      "INSERT INTO reservas (data, horario, cliente_id, servico_id, observacoes, status) VALUES (?, ?, ?, ?, ?, 'pendente')",
      [data, horario, clienteId, servico_id, observacoes || null]
    );

    // Envia e-mail de notificação
    transporter.sendMail({
      from: `"Bella Unhas Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_DEST,
      subject: "💅 Novo agendamento - Bella Unhas Studio",
      html: `
        <h2>Novo agendamento recebido!</h2>
        <p><strong>Cliente:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Serviço:</strong> ${servico ? servico.nome : servico_id}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Horário:</strong> ${horario}</p>
        <p><strong>Observações:</strong> ${observacoes || "Nenhuma"}</p>
      `,
    }).catch(err => console.error("Erro ao enviar e-mail:", err.message));

    res.status(201).json({ id: result.insertId, status: "pendente", message: "Reserva criada com sucesso" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/reservas/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!["pendente","confirmado","cancelado"].includes(status))
    return res.status(400).json({ error: "Status invalido" });
  try {
    await pool.query("UPDATE reservas SET status=? WHERE id=?", [status, req.params.id]);
    res.json({ ok: true, status });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/reservas/:id", async (req, res) => {
  try {
    await pool.query("UPDATE reservas SET status='cancelado' WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/reservas/disponiveis", async (req, res) => {
  const { data } = req.query;
  if (!data) return res.status(400).json({ error: "data e obrigatoria" });

  const diaSemana = new Date(data).getUTCDay();

  if (diaSemana === 0) {
    return res.json({ data, slots: [] });
  }

  const allSlots = diaSemana === 6
    ? ["07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00"]
    : ["07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30"];

  try {
    const [ocupados] = await pool.query("SELECT horario FROM reservas WHERE data=? AND status != 'cancelado'", [data]);
    const busy = ocupados.map(r => r.horario);
    res.json({ data, slots: allSlots.map(s => ({ horario: s, disponivel: !busy.includes(s) })) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Bella Unhas API rodando na porta ${PORT}`));
