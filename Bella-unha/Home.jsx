export default function Home({ setPage }) {
  const highlights = [
    { emoji: "💅", label: "Esmaltação" },
    { emoji: "✨", label: "Gel UV" },
    { emoji: "🌸", label: "Nail Art" },
    { emoji: "💆", label: "Spa de Mãos" },
    { emoji: "🦋", label: "Press-On" },
    { emoji: "💎", label: "Acrílico" },
    { emoji: "🌺", label: "Pedicure" },
    { emoji: "🎨", label: "Decoração" },
    { emoji: "🔮", label: "Chrome" },
  ];

  const testimonials = [
    {
      text: "Melhor salão que já fui! A qualidade do serviço é impecável e a Bella é super atenciosa. Saio sempre linda!",
      author: "Mariana S.",
      avatar: "👩🏻",
      since: "Cliente há 2 anos",
      stars: 5,
    },
    {
      text: "O gel UV dura mais de 3 semanas sem lascar. Já indiquei para todas as minhas amigas. Atendimento nota 10!",
      author: "Camila R.",
      avatar: "👩🏽",
      since: "Cliente há 1 ano",
      stars: 5,
    },
    {
      text: "Nail art incrível! Eles capturaram exatamente o design que eu queria. O ambiente é lindo e super aconchegante.",
      author: "Fernanda L.",
      avatar: "👩🏼",
      since: "Cliente há 6 meses",
      stars: 5,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span /> Salão Premium de Nail Design <span />
            </div>
            <h1 className="hero-title">
              Arte nas<br />
              pontas dos<br />
              <em>seus dedos</em>
            </h1>
            <p className="hero-desc">
              Experiência de beleza premium com produtos de alta qualidade, nail artists especializadas e o cuidado que você merece. Cada detalhe pensado para realçar sua elegância.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setPage("schedule")}>
                ✦ Agendar Horário
              </button>
              <button className="btn btn-outline" onClick={() => setPage("services")}>
                Ver Serviços
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">2.400+</div>
                <div className="stat-lbl">Clientes felizes</div>
              </div>
              <div>
                <div className="stat-num">5★</div>
                <div className="stat-lbl">Avaliação média</div>
              </div>
              <div>
                <div className="stat-num">8 anos</div>
                <div className="stat-lbl">De experiência</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blob">
              <div className="hero-emoji-grid">
                {highlights.map((h, i) => (
                  <div className="hero-card" key={i}>
                    <div className="emoji">{h.emoji}</div>
                    <p>{h.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="badge-float b1">
              <span>⏱</span>
              <div><strong>Pontual</strong><br />sem espera</div>
            </div>
            <div className="badge-float b2">
              <span>🏆</span>
              <div><strong>Melhor salão</strong><br />da região 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-label">Nossa galeria</span>
            <h2 className="section-title">Trabalhos <em>recentes</em></h2>
          </div>
          <div className="gallery-strip">
            {["💅","✨","🌸","💎","🦋","🎨","🌺","🔮","💜","💗","🌟","🦚"].map((e, i) => (
              <div className="gallery-item" key={i}>{e}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ background: "var(--blush)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">O que oferecemos</span>
            <h2 className="section-title">Nossos <em>serviços</em></h2>
            <p style={{ color: "var(--ink-lt)", marginTop: 16, maxWidth: 520, marginInline: "auto" }}>
              Do clássico ao contemporâneo, temos tudo para deixar suas unhas impecáveis.
            </p>
          </div>
          <div className="services-grid">
            {[
              { icon: "💅", name: "Esmaltação Simples", price: "R$ 35", dur: "30 min", desc: "Esmaltação caprichada com acabamento perfeito e duradouro.", badge: null },
              { icon: "✨", name: "Gel UV", price: "R$ 120", dur: "1h30", desc: "Unhas alongadas ou capa de gel com brilho intenso e durabilidade de 3+ semanas.", badge: "Popular" },
              { icon: "🌸", name: "Nail Art", price: "R$ 80", dur: "1h", desc: "Designs exclusivos e personalizados para expressar sua personalidade.", badge: null },
              { icon: "💆", name: "Spa de Mãos", price: "R$ 90", dur: "1h15", desc: "Esfoliação, hidratação profunda, massagem e esmaltação.", badge: "Especial" },
            ].map((s, i) => (
              <div className="service-card" key={i}>
                {s.badge && <span className="service-badge">{s.badge}</span>}
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-footer">
                  <span className="service-price">{s.price}</span>
                  <span className="service-dur">⏱ {s.dur}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn btn-outline" onClick={() => setPage("services")}>
              Ver todos os serviços →
            </button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span className="section-label">Por que nos escolher</span>
              <h2 className="section-title">Qualidade que <em>você sente</em></h2>
              <p style={{ color: "var(--ink-lt)", marginTop: 20, lineHeight: 1.8, marginBottom: 32 }}>
                No Bella Unhas, cada cliente recebe atenção individualizada. Usamos apenas produtos premium, com foco em saúde das unhas e satisfação total.
              </p>
              {[
                { icon: "🌿", title: "Produtos veganos e cruelty-free", desc: "Somente marcas certificadas que respeitam você e o planeta." },
                { icon: "🔬", title: "Esterilização rigorosa", desc: "Todos os instrumentos são esterilizados antes de cada atendimento." },
                { icon: "🎓", title: "Profissionais certificadas", desc: "Nossa equipe se atualiza continuamente com as tendências mundiais." },
                { icon: "⏰", title: "Pontualidade garantida", desc: "Respeitamos seu tempo. Agenda organizada sem atrasos." },
              ].map((item, i) => (
                <div className="perk" key={i} style={{ marginBottom: 16 }}>
                  <div className="perk-icon">{item.icon}</div>
                  <div>
                    <strong style={{ fontSize: ".9rem" }}>{item.title}</strong>
                    <p style={{ fontSize: ".82rem", color: "var(--ink-lt)", marginTop: 2 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: "linear-gradient(135deg, var(--nude) 0%, var(--blush) 100%)",
              borderRadius: "var(--radius-lg)", padding: 48, textAlign: "center",
              border: "1px solid var(--nude)"
            }}>
              <div style={{ fontSize: "5rem", marginBottom: 24 }}>💅</div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.5, marginBottom: 20 }}>
                "Beleza não é vaidade, é autoestima. Cuide-se."
              </p>
              <div style={{ fontSize: ".85rem", color: "var(--ink-lt)" }}>— Bella Unhas Studio</div>
              <button className="btn btn-primary" style={{ marginTop: 32 }} onClick={() => setPage("schedule")}>
                ✦ Agendar agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container section-center">
          <span className="section-label">Depoimentos</span>
          <h2 className="section-title">O que dizem nossas <em>clientes</em></h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="stars">{"★".repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.author}</div>
                    <div className="author-since">{t.since}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "var(--ink)", padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--rose-lt)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 16 }}>
            Pronta para se cuidar?
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--white)", fontWeight: 400, marginBottom: 16 }}>
            Agende seu horário <em style={{ color: "var(--rose-lt)", fontStyle: "italic" }}>hoje</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 36, maxWidth: 480, marginInline: "auto" }}>
            Agenda online disponível 24h. Confirme sua reserva em poucos cliques.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => setPage("schedule")}>
              ✦ Agendar Horário
            </button>
            <a
              href="https://wa.me/5511999998888"
              className="btn btn-outline"
              style={{ color: "#25d366", borderColor: "#25d366" }}
              target="_blank" rel="noopener noreferrer"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
