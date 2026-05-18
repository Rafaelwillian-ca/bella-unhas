import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.mensagem) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, var(--blush) 0%, var(--nude) 100%)",
        padding: "64px 0 56px", textAlign: "center",
        borderBottom: "1px solid var(--nude)"
      }}>
        <div className="container">
          <span className="section-label">Fale conosco</span>
          <h1 className="section-title">Entre em <em>contato</em></h1>
          <p style={{ color: "var(--ink-lt)", marginTop: 16, maxWidth: 480, marginInline: "auto", lineHeight: 1.8 }}>
            Tem alguma dúvida, sugestão ou quer saber mais sobre nossos serviços? Adoramos ouvir você!
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="contact-wrap">
            {/* LEFT: Info */}
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <h4>Endereço</h4>
                  <p>Rua das Flores, 123 – Centro<br />São Paulo, SP – CEP 01310-100</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div>
                  <h4>Telefone & WhatsApp</h4>
                  <p>(11) 99999-8888<br />Resposta rápida via WhatsApp</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div>
                  <h4>E-mail</h4>
                  <p>contato@bellaunhas.com.br<br />Respondemos em até 24h</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">⏰</div>
                <div>
                  <h4>Horário de Funcionamento</h4>
                  <p>Segunda a Sexta: 09h às 19h<br />Sábado: 09h às 17h<br />Domingo: Fechado</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📸</div>
                <div>
                  <h4>Redes Sociais</h4>
                  <p>
                    <a href="#" style={{ color: "var(--rose)" }}>@bellaunhas</a> no Instagram<br />
                    <a href="#" style={{ color: "var(--rose)" }}>Bella Unhas Studio</a> no Facebook
                  </p>
                </div>
              </div>
              <div className="map-placeholder">
                🗺️ Mapa — integre Google Maps aqui
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="booking-form">
              <h3>Envie uma mensagem</h3>

              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>✅</div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 10 }}>
                    Mensagem enviada!
                  </h4>
                  <p style={{ color: "var(--ink-lt)", lineHeight: 1.8 }}>
                    Recebemos seu contato e responderemos em breve. Obrigada pela mensagem!
                  </p>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: 24 }}
                    onClick={() => { setSent(false); setForm({ nome: "", email: "", assunto: "", mensagem: "" }); }}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome completo *</label>
                      <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>E-mail *</label>
                      <input name="email" type="email" placeholder="seuemail@email.com" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="form-group full">
                      <label>Assunto</label>
                      <select name="assunto" value={form.assunto} onChange={handleChange}>
                        <option value="">Selecione o assunto…</option>
                        <option>Dúvida sobre serviços</option>
                        <option>Agendamento</option>
                        <option>Pacotes e promoções</option>
                        <option>Reclamação ou sugestão</option>
                        <option>Outro</option>
                      </select>
                    </div>
                    <div className="form-group full">
                      <label>Mensagem *</label>
                      <textarea
                        name="mensagem"
                        placeholder="Escreva sua mensagem aqui…"
                        value={form.mensagem} onChange={handleChange}
                        rows={5}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary form-submit"
                    onClick={handleSubmit}
                    disabled={loading || !form.nome || !form.email || !form.mensagem}
                    style={{ opacity: (loading || !form.nome || !form.email || !form.mensagem) ? .6 : 1, justifyContent: "center" }}
                  >
                    {loading ? "⏳ Enviando…" : "✦ Enviar Mensagem"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT BANNER */}
      <section style={{ background: "var(--ink)", padding: "64px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, textAlign: "center" }}>
          {[
            {
              icon: "💬",
              title: "WhatsApp",
              desc: "Resposta imediata das 9h às 19h",
              cta: "Chamar no WhatsApp",
              href: "https://wa.me/5511999998888",
              color: "#25d366"
            },
            {
              icon: "📞",
              title: "Ligação",
              desc: "Prefere ligar? Estamos disponíveis!",
              cta: "(11) 99999-8888",
              href: "tel:+5511999998888",
              color: "var(--rose-lt)"
            },
            {
              icon: "📸",
              title: "Instagram",
              desc: "Veja nossos trabalhos e novidades",
              cta: "@bellaunhas",
              href: "#",
              color: "#e1306c"
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: 24 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".875rem", marginBottom: 16 }}>{item.desc}</p>
              <a
                href={item.href}
                className="btn"
                style={{
                  background: "transparent", border: `1.5px solid ${item.color}`,
                  color: item.color, padding: "10px 20px", borderRadius: "var(--radius-xl)",
                  fontSize: ".875rem", display: "inline-flex"
                }}
                target="_blank" rel="noopener noreferrer"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
