import { useState } from "react";

// Mock data simulating what the backend would return from /api/reservas, /api/clientes, /api/servicos
const MOCK_RESERVAS = [
  { id: 1, cliente: "Ana Paula Souza", telefone: "(11) 98765-4321", servico: "Gel UV Alongamento", data: "2025-01-20", horario: "10:00", status: "confirmado" },
  { id: 2, cliente: "Beatriz Lima", telefone: "(11) 91234-5678", servico: "Nail Art Completa", data: "2025-01-20", horario: "14:00", status: "confirmado" },
  { id: 3, cliente: "Camila Santos", telefone: "(11) 97777-8888", servico: "Spa de Mãos", data: "2025-01-21", horario: "09:00", status: "pendente" },
  { id: 4, cliente: "Daniela Rocha", telefone: "(11) 99999-1111", servico: "Esmaltação Simples", data: "2025-01-21", horario: "11:00", status: "confirmado" },
  { id: 5, cliente: "Eduarda Costa", telefone: "(11) 92222-3333", servico: "Pedicure Spa", data: "2025-01-22", horario: "15:00", status: "cancelado" },
  { id: 6, cliente: "Fernanda Alves", telefone: "(11) 95555-6666", servico: "Manutenção de Gel", data: "2025-01-22", horario: "16:30", status: "pendente" },
];

const MOCK_CLIENTES = [
  { id: 1, nome: "Ana Paula Souza", telefone: "(11) 98765-4321", email: "ana@email.com", visitas: 12, ultima: "2025-01-20" },
  { id: 2, nome: "Beatriz Lima", telefone: "(11) 91234-5678", email: "beatriz@email.com", visitas: 8, ultima: "2025-01-20" },
  { id: 3, nome: "Camila Santos", telefone: "(11) 97777-8888", email: "camila@email.com", visitas: 3, ultima: "2025-01-19" },
  { id: 4, nome: "Daniela Rocha", telefone: "(11) 99999-1111", email: "daniela@email.com", visitas: 22, ultima: "2025-01-18" },
  { id: 5, nome: "Eduarda Costa", telefone: "(11) 92222-3333", email: "edu@email.com", visitas: 1, ultima: "2025-01-15" },
];

const MOCK_SERVICOS_STATS = [
  { servico: "Gel UV Alongamento", total: 48, receita: 7200 },
  { servico: "Nail Art Completa", total: 32, receita: 2560 },
  { servico: "Spa de Mãos", total: 28, receita: 2520 },
  { servico: "Esmaltação Simples", total: 65, receita: 2275 },
  { servico: "Pedicure Spa", total: 41, receita: 3280 },
];

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [reservas, setReservas] = useState(MOCK_RESERVAS);
  const [authOk, setAuthOk] = useState(false);
  const [senha, setSenha] = useState("");
  const [authErr, setAuthErr] = useState(false);

  const handleLogin = () => {
    if (senha === "admin123") {
      setAuthOk(true);
    } else {
      setAuthErr(true);
      setTimeout(() => setAuthErr(false), 2000);
    }
  };

  const cancelarReserva = (id) => {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, status: "cancelado" } : r));
  };
  const confirmarReserva = (id) => {
    setReservas(prev => prev.map(r => r.id === id ? { ...r, status: "confirmado" } : r));
  };

  const stats = {
    totalReservas: reservas.length,
    confirmadas: reservas.filter(r => r.status === "confirmado").length,
    pendentes: reservas.filter(r => r.status === "pendente").length,
    canceladas: reservas.filter(r => r.status === "cancelado").length,
    clientes: MOCK_CLIENTES.length,
    receitaTotal: MOCK_SERVICOS_STATS.reduce((s, r) => s + r.receita, 0),
  };

  if (!authOk) {
    return (
      <div style={{
        paddingTop: 72, minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, var(--ink) 0%, #3d2a26 100%)"
      }}>
        <div style={{
          background: "var(--white)", borderRadius: "var(--radius-lg)",
          padding: "48px 40px", width: "min(420px, 90vw)",
          boxShadow: "var(--shadow-lg)", textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🔐</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", marginBottom: 8 }}>
            Painel Admin
          </h2>
          <p style={{ color: "var(--ink-lt)", fontSize: ".875rem", marginBottom: 28 }}>
            Área restrita — Bella Unhas Studio
          </p>
          <div className="form-group" style={{ textAlign: "left", marginBottom: 20 }}>
            <label>Senha de acesso</label>
            <input
              type="password"
              placeholder="Digite a senha…"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ borderColor: authErr ? "var(--rose)" : undefined }}
            />
            {authErr && <p style={{ color: "var(--rose)", fontSize: ".78rem", marginTop: 6 }}>Senha incorreta. Tente: admin123</p>}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleLogin}>
            Entrar no Painel
          </button>
          <p style={{ color: "var(--ink-lt)", fontSize: ".75rem", marginTop: 16 }}>
            Senha demo: <code>admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h1>✦ Painel Administrativo</h1>
          <p style={{ fontSize: ".875rem", opacity: .6, marginTop: 4 }}>Bella Unhas Studio — Bem-vinda de volta!</p>
        </div>
        <button
          className="btn btn-outline"
          style={{ color: "rgba(255,255,255,.7)", borderColor: "rgba(255,255,255,.2)" }}
          onClick={() => setAuthOk(false)}
        >
          Sair
        </button>
      </div>

      {/* TABS */}
      <div className="admin-tabs">
        {["dashboard","reservas","clientes","servicos"].map(t => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {{ dashboard: "📊 Dashboard", reservas: "📅 Reservas", clientes: "👥 Clientes", servicos: "💅 Serviços" }[t]}
          </button>
        ))}
      </div>

      <div className="admin-content">

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat">
                <div className="num">{stats.totalReservas}</div>
                <div className="lbl">Total de Reservas</div>
              </div>
              <div className="admin-stat" style={{ borderColor: "var(--gold)" }}>
                <div className="num" style={{ color: "var(--gold)" }}>{stats.confirmadas}</div>
                <div className="lbl">Confirmadas</div>
              </div>
              <div className="admin-stat" style={{ borderColor: "#f59e0b" }}>
                <div className="num" style={{ color: "#f59e0b" }}>{stats.pendentes}</div>
                <div className="lbl">Pendentes</div>
              </div>
              <div className="admin-stat" style={{ borderColor: "#10b981" }}>
                <div className="num" style={{ color: "#10b981" }}>R$ {stats.receitaTotal.toLocaleString("pt-BR")}</div>
                <div className="lbl">Receita Total</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16 }}>
                  Próximas reservas
                </h3>
                {reservas.filter(r => r.status !== "cancelado").slice(0, 5).map(r => (
                  <div key={r.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: "1px solid var(--nude)", fontSize: ".875rem"
                  }}>
                    <div>
                      <strong>{r.cliente}</strong>
                      <div style={{ color: "var(--ink-lt)", fontSize: ".8rem" }}>{r.data} às {r.horario}</div>
                    </div>
                    <span className={`status-badge status-${r.status}`}>{r.status}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16 }}>
                  Serviços mais populares
                </h3>
                {MOCK_SERVICOS_STATS.slice(0, 5).map((s, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", marginBottom: 4 }}>
                      <span style={{ fontWeight: 500 }}>{s.servico}</span>
                      <span style={{ color: "var(--rose)" }}>{s.total}x</span>
                    </div>
                    <div style={{ background: "var(--nude)", borderRadius: 4, height: 6 }}>
                      <div style={{
                        background: "linear-gradient(90deg, var(--rose), var(--gold))",
                        height: "100%", borderRadius: 4,
                        width: `${(s.total / 65) * 100}%`,
                        transition: "width .5s"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── RESERVAS ── */}
        {tab === "reservas" && (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td><strong>{r.cliente}</strong></td>
                    <td>{r.telefone}</td>
                    <td>{r.servico}</td>
                    <td>{r.data}</td>
                    <td>{r.horario}</td>
                    <td><span className={`status-badge status-${r.status}`}>{r.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {r.status === "pendente" && (
                          <button
                            onClick={() => confirmarReserva(r.id)}
                            style={{
                              background: "#f0fdf4", color: "#166534",
                              border: "1px solid #bbf7d0", borderRadius: 6,
                              padding: "4px 10px", fontSize: ".75rem", cursor: "pointer"
                            }}
                          >Confirmar</button>
                        )}
                        {r.status !== "cancelado" && (
                          <button
                            onClick={() => cancelarReserva(r.id)}
                            style={{
                              background: "#fff1f2", color: "#9f1239",
                              border: "1px solid #fecdd3", borderRadius: 6,
                              padding: "4px 10px", fontSize: ".75rem", cursor: "pointer"
                            }}
                          >Cancelar</button>
                        )}
                        <a
                          href={`https://wa.me/55${r.telefone.replace(/\D/g,'')}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            background: "#f0fdf4", color: "#15803d",
                            border: "1px solid #bbf7d0", borderRadius: 6,
                            padding: "4px 10px", fontSize: ".75rem", display: "inline-block"
                          }}
                        >💬</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── CLIENTES ── */}
        {tab === "clientes" && (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Visitas</th>
                  <th>Última visita</th>
                  <th>Contato</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLIENTES.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td><strong>{c.nome}</strong></td>
                    <td>{c.telefone}</td>
                    <td>{c.email}</td>
                    <td>
                      <span style={{
                        background: "var(--blush)", color: "var(--rose)",
                        padding: "3px 10px", borderRadius: "var(--radius-xl)",
                        fontSize: ".78rem", fontWeight: 600
                      }}>{c.visitas}x</span>
                    </td>
                    <td>{c.ultima}</td>
                    <td>
                      <a
                        href={`https://wa.me/55${c.telefone.replace(/\D/g,'')}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          background: "#dcfce7", color: "#15803d",
                          border: "1px solid #bbf7d0", borderRadius: 6,
                          padding: "5px 12px", fontSize: ".78rem", display: "inline-block"
                        }}
                      >💬 WhatsApp</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── SERVIÇOS ── */}
        {tab === "servicos" && (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Agendamentos</th>
                  <th>Receita Gerada</th>
                  <th>Ticket Médio</th>
                  <th>% do Total</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SERVICOS_STATS.map((s, i) => (
                  <tr key={i}>
                    <td><strong>{s.servico}</strong></td>
                    <td>{s.total}</td>
                    <td style={{ color: "#166534", fontWeight: 500 }}>
                      R$ {s.receita.toLocaleString("pt-BR")}
                    </td>
                    <td>R$ {(s.receita / s.total).toFixed(0)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ background: "var(--nude)", borderRadius: 4, height: 8, width: 80 }}>
                          <div style={{
                            background: "linear-gradient(90deg,var(--rose),var(--gold))",
                            height: "100%", borderRadius: 4,
                            width: `${(s.total / 65) * 100}%`
                          }} />
                        </div>
                        <span style={{ fontSize: ".78rem", color: "var(--ink-lt)" }}>
                          {((s.total / MOCK_SERVICOS_STATS.reduce((a,b) => a + b.total, 0)) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
