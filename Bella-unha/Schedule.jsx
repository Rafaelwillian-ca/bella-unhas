import { useState } from "react";

const SERVICES_LIST = [
  { id: 1, label: "Esmaltação Simples – R$ 35", dur: "30 min" },
  { id: 2, label: "Esmaltação em Gel – R$ 55", dur: "45 min" },
  { id: 3, label: "Gel UV Alongamento – R$ 150", dur: "2h" },
  { id: 4, label: "Manutenção de Gel – R$ 90", dur: "1h" },
  { id: 5, label: "Nail Art Simples – R$ 25", dur: "20 min" },
  { id: 6, label: "Nail Art Completa – R$ 80", dur: "1h" },
  { id: 7, label: "Spa de Mãos – R$ 90", dur: "1h15" },
  { id: 8, label: "Pedicure Spa – R$ 80", dur: "1h" },
  { id: 9, label: "Pedicure Simples – R$ 45", dur: "45 min" },
  { id: 10, label: "Efeito Chrome – R$ 60", dur: "45 min" },
];

const ALL_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30",
];
const BUSY_SLOTS = ["10:00","11:30","14:30","16:00"];

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

const initialForm = {
  nome: "", telefone: "", email: "",
  servico: "", data: getTodayStr(), horario: "", observacoes: ""
};

export default function Schedule() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [reservas, setReservas] = useState([]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const selectSlot = (slot) => {
    if (BUSY_SLOTS.includes(slot)) return;
    setForm(f => ({ ...f, horario: slot }));
    if (status) setStatus(null);
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.telefone || !form.email || !form.servico || !form.data || !form.horario) {
      setStatus("error");
      return;
    }
    setLoading(true);
    // Simula chamada à API POST /api/reservas
    await new Promise(r => setTimeout(r, 1200));
    const novaReserva = {
      id: Date.now(),
      ...form,
      status: "confirmado",
      criado: new Date().toLocaleString("pt-BR"),
    };
    setReservas(prev => [novaReserva, ...prev]);
    setStatus("success");
    setForm(initialForm);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, var(--nude) 0%, var(--blush) 100%)",
        padding: "64px 0 56px", textAlign: "center",
        borderBottom: "1px solid var(--nude)"
      }}>
        <div className="container">
          <span className="section-label">Agenda online</span>
          <h1 className="section-title">Agende seu <em>horário</em></h1>
          <p style={{ color: "var(--ink-lt)", marginTop: 16, maxWidth: 500, marginInline: "auto", lineHeight: 1.8 }}>
            Escolha o serviço, a data e o horário que preferir. Confirmação imediata por e-mail e WhatsApp.
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="schedule-wrap">
            {/* LEFT: Info */}
            <div className="schedule-info">
              <h3>Como funciona?</h3>
              <p>
                Preencha o formulário ao lado com seus dados e preferências. Nossa equipe confirmará o agendamento em até 15 minutos via WhatsApp.
              </p>
              <div className="schedule-perks">
                {[
                  { icon: "📱", text: "Confirmação imediata por WhatsApp" },
                  { icon: "✉️", text: "E-mail de confirmação automático" },
                  { icon: "🔔", text: "Lembrete 1h antes do horário" },
                  { icon: "❌", text: "Cancelamento gratuito até 2h antes" },
                  { icon: "💳", text: "Pagamento no local ou online" },
                  { icon: "⏰", text: "Horários: Seg–Sáb, 9h às 19h" },
                ].map((p, i) => (
                  <div className="perk" key={i}>
                    <div className="perk-icon">{p.icon}</div>
                    <span style={{ fontSize: ".9rem" }}>{p.text}</span>
                  </div>
                ))}
              </div>

              {/* RECENT BOOKINGS */}
              {reservas.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16 }}>
                    Reservas recentes
                  </h4>
                  {reservas.slice(0, 3).map(r => (
                    <div key={r.id} style={{
                      background: "var(--white)", border: "1px solid var(--nude)",
                      borderRadius: "var(--radius)", padding: "14px 16px",
                      marginBottom: 10, fontSize: ".85rem"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>{r.nome}</strong>
                        <span className="status-badge status-confirmed">✓ Confirmado</span>
                      </div>
                      <div style={{ color: "var(--ink-lt)", marginTop: 4 }}>
                        {r.data} às {r.horario} — {SERVICES_LIST.find(s => String(s.id) === r.servico)?.label.split("–")[0] || r.servico}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Form */}
            <div className="booking-form">
              <h3>Preencha seus dados</h3>

              {status === "success" && (
                <div className="alert alert-success">
                  ✅ <div><strong>Reserva confirmada!</strong> Você receberá uma confirmação por e-mail e WhatsApp em breve.</div>
                </div>
              )}
              {status === "error" && (
                <div className="alert alert-error">
                  ⚠️ <div>Por favor, preencha todos os campos obrigatórios e selecione um horário.</div>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label>Nome completo *</label>
                  <input
                    name="nome" placeholder="Seu nome"
                    value={form.nome} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Telefone / WhatsApp *</label>
                  <input
                    name="telefone" placeholder="(11) 99999-8888"
                    value={form.telefone} onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label>E-mail *</label>
                  <input
                    name="email" type="email" placeholder="seuemail@email.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label>Serviço desejado *</label>
                  <select name="servico" value={form.servico} onChange={handleChange}>
                    <option value="">Selecione um serviço…</option>
                    {SERVICES_LIST.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Data *</label>
                  <input
                    name="data" type="date"
                    min={getTodayStr()}
                    value={form.data} onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label>Horário disponível * {BUSY_SLOTS.length > 0 && <span style={{ color: "var(--rose-lt)", fontSize: ".75rem" }}>(cinza = ocupado)</span>}</label>
                  <div className="time-slots">
                    {ALL_SLOTS.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => selectSlot(slot)}
                        className={`time-slot ${form.horario === slot ? "selected" : ""} ${BUSY_SLOTS.includes(slot) ? "busy" : ""}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group full">
                  <label>Observações</label>
                  <textarea
                    name="observacoes"
                    placeholder="Ex: design específico, alergia a produtos, etc."
                    value={form.observacoes} onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary form-submit"
                onClick={handleSubmit}
                disabled={loading}
                style={{ opacity: loading ? .7 : 1, justifyContent: "center" }}
              >
                {loading ? "⏳ Confirmando reserva…" : "✦ Confirmar Agendamento"}
              </button>

              <p style={{ textAlign: "center", fontSize: ".78rem", color: "var(--ink-lt)", marginTop: 12 }}>
                Ao agendar, você concorda com nossa política de cancelamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
