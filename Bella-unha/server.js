// ============================================================
//  Bella Unhas Studio — Backend API
//  Node.js + Express + MySQL
//  Rotas: /api/clientes, /api/servicos, /api/reservas
// ============================================================

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// ─── DB POOL ─────────────────────────────────────────────────
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "senha",
  database: process.env.DB_NAME     || "bella_unhas",
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── NODEMAILER ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function enviarEmailConfirmacao({ nome, email, servico, data, horario }) {
  await transporter.sendMail({
    from: `"Bella Unhas Studio" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "✦ Agendamento Confirmado – Bella Unhas",
    html: `
      <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:32px;background:#fdf8f5;border-radius:12px;">
        <h2 style="color:#c8756b;font-size:1.6rem;margin-bottom:8px;">✦ Agendamento Confirmado!</h2>
        <p style="color:#5a3f39;">Olá, <strong>${nome}</strong>!</p>
        <p style="color:#5a3f39;">Seu horário foi reservado com sucesso no <strong>Bella Unhas Studio</strong>.</p>
        <div style="background:#fff;border-radius:8px;padding:20px;margin:24px 0;border:1px solid #f0dcd8;">
          <p><strong>Serviço:</strong> ${servico}</p>
          <p><strong>Data:</strong> ${data}</p>
          <p><strong>Horário:</strong> ${horario}</p>
          <p><strong>Endereço:</strong> Rua das Flores, 123 – Centro</p>
        </div>
        <p style="color:#a08078;font-size:.875rem;">Cancelamentos gratuitos até 2h antes do horário.</p>
        <p style="color:#c8756b;">Até breve! 💅</p>
      </div>
    `,
  });
}

// ─── HEALTH ───────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ ok: true, ts: new Date() }));

// ════════════════════════════════════════════════════════════
//  /api/servicos
// ════════════════════════════════════════════════════════════
app.get("/api/servicos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servicos ORDER BY nome");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/servicos", async (req, res) => {
  const { nome, preco, duracao_minutos, descricao } = req.body;
  if (!nome || !preco) return res.status(400).json({ error: "nome e preco são obrigatórios" });
  try {
    const [result] = await pool.query(
      "INSERT INTO servicos (nome, preco, duracao_minutos, descricao) VALUES (?, ?, ?, ?)",
      [nome, preco, duracao_minutos || null, descricao || null]
    );
    res.status(201).json({ id: result.insertId, nome, preco });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/servicos/:id", async (req, res) => {
  const { nome, preco, duracao_minutos, descricao } = req.body;
  try {
    await pool.query(
      "UPDATE servicos SET nome=?, preco=?, duracao_minutos=?, descricao=? WHERE id=?",
      [nome, preco, duracao_minutos, descricao, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/servicos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM servicos WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
//  /api/clientes
// ════════════════════════════════════════════════════════════
app.get("/api/clientes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes ORDER BY nome");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/clientes/:id", async (req, res) => {
  try {
    const [[cliente]] = await pool.query("SELECT * FROM clientes WHERE id=?", [req.params.id]);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    const [reservas] = await pool.query(
      `SELECT r.*, s.nome AS servico_nome FROM reservas r
       JOIN servicos s ON r.servico_id = s.id
       WHERE r.cliente_id=? ORDER BY r.data DESC`, [req.params.id]
    );
    res.json({ ...cliente, reservas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/clientes", async (req, res) => {
  const { nome, telefone, email } = req.body;
  if (!nome || !telefone) return res.status(400).json({ error: "nome e telefone são obrigatórios" });
  try {
    // Upsert por telefone
    const [[existing]] = await pool.query("SELECT id FROM clientes WHERE telefone=?", [telefone]);
    if (existing) return res.json({ id: existing.id, exists: true });
    const [result] = await pool.query(
      "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)",
      [nome, telefone, email || null]
    );
    res.status(201).json({ id: result.insertId, nome, telefone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/clientes/:id", async (req, res) => {
  const { nome, telefone, email } = req.body;
  try {
    await pool.query("UPDATE clientes SET nome=?, telefone=?, email=? WHERE id=?",
      [nome, telefone, email, req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
//  /api/reservas
// ════════════════════════════════════════════════════════════
app.get("/api/reservas", async (req, res) => {
  try {
    const { data, status: statusFiltro } = req.query;
    let sql = `
      SELECT r.*, c.nome AS cliente_nome, c.telefone, c.email,
             s.nome AS servico_nome, s.preco, s.duracao_minutos
      FROM reservas r
      JOIN clientes c ON r.cliente_id = c.id
      JOIN servicos s ON r.servico_id = s.id
      WHERE 1=1
    `;
    const params = [];
    if (data)         { sql += " AND r.data = ?";   params.push(data); }
    if (statusFiltro) { sql += " AND r.status = ?"; params.push(statusFiltro); }
    sql += " ORDER BY r.data, r.horario";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/reservas", async (req, res) => {
  const { nome, telefone, email, servico_id, data, horario, observacoes } = req.body;
  if (!nome || !telefone || !servico_id || !data || !horario) {
    return res.status(400).json({ error: "Campos obrigatórios: nome, telefone, servico_id, data, horario" });
  }
  try {
    // Verificar conflito de horário
    const [[conflict]] = await pool.query(
      "SELECT id FROM reservas WHERE data=? AND horario=? AND status != 'cancelado'",
      [data, horario]
    );
    if (conflict) return res.status(409).json({ error: "Horário já ocupado" });

    // Upsert cliente
    let clienteId;
    const [[existing]] = await pool.query("SELECT id FROM clientes WHERE telefone=?", [telefone]);
    if (existing) {
      clienteId = existing.id;
    } else {
      const [r] = await pool.query(
        "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)", [nome, telefone, email || null]
      );
      clienteId = r.insertId;
    }

    // Buscar serviço
    const [[servico]] = await pool.query("SELECT nome FROM servicos WHERE id=?", [servico_id]);
    if (!servico) return res.status(404).json({ error: "Serviço não encontrado" });

    // Criar reserva
    const [result] = await pool.query(
      "INSERT INTO reservas (data, horario, cliente_id, servico_id, observacoes, status) VALUES (?, ?, ?, ?, ?, 'pendente')",
      [data, horario, clienteId, servico_id, observacoes || null]
    );

    // Enviar e-mail (não bloquear resposta)
    if (email) {
      enviarEmailConfirmacao({ nome, email, servico: servico.nome, data, horario }).catch(console.error);
    }

    res.status(201).json({ id: result.insertId, status: "pendente", message: "Reserva criada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/reservas/:id/status", async (req, res) => {
  const { status } = req.body;
  const validos = ["pendente", "confirmado", "cancelado"];
  if (!validos.includes(status)) return res.status(400).json({ error: "Status inválido" });
  try {
    await pool.query("UPDATE reservas SET status=? WHERE id=?", [status, req.params.id]);
    res.json({ ok: true, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/reservas/:id", async (req, res) => {
  try {
    await pool.query("UPDATE reservas SET status='cancelado' WHERE id=?", [req.params.id]);
    res.json({ ok: true, message: "Reserva cancelada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Horários disponíveis para uma data
app.get("/api/reservas/disponiveis", async (req, res) => {
  const { data } = req.query;
  if (!data) return res.status(400).json({ error: "data é obrigatória" });
  const allSlots = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00","18:30"
  ];
  try {
    const [ocupados] = await pool.query(
      "SELECT horario FROM reservas WHERE data=? AND status != 'cancelado'", [data]
    );
    const busy = ocupados.map(r => r.horario);
    res.json({ data, slots: allSlots.map(s => ({ horario: s, disponivel: !busy.includes(s) })) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── START ────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌸 Bella Unhas API rodando na porta ${PORT}`));
