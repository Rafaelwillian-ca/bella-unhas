import { useState } from "react";

const ALL_SERVICES = [
  { id: 1, icon: "💅", name: "Esmaltação Simples", price: 35, dur: "30 min", cat: "Mãos", desc: "Esmaltação caprichada com base, cor e finalizador de qualidade. Duração média de 5 dias.", badge: null },
  { id: 2, icon: "💅", name: "Esmaltação em Gel", price: 55, dur: "45 min", cat: "Mãos", desc: "Esmaltação com esmalte gel que dura até 2 semanas sem descascar.", badge: null },
  { id: 3, icon: "✨", name: "Gel UV Alongamento", price: 150, dur: "2h", cat: "Gel & Acrílico", desc: "Alongamento em gel com molde, ideal para quem quer unhas longas e resistentes.", badge: "Premium" },
  { id: 4, icon: "✨", name: "Manutenção de Gel", price: 90, dur: "1h", cat: "Gel & Acrílico", desc: "Manutenção e refil do gel já aplicado. Mantém o comprimento e renovação da cor.", badge: null },
  { id: 5, icon: "💎", name: "Acrílico com Fibra", price: 170, dur: "2h30", cat: "Gel & Acrílico", desc: "Alongamento em acrílico reforçado com fibra de vidro. Resultado ultra resistente.", badge: "Premium" },
  { id: 6, icon: "🌸", name: "Nail Art Simples", price: 25, dur: "20 min", cat: "Nail Art", desc: "Desenho livre em 2 unhas. Preço por elemento/detalhe adicional.", badge: null },
  { id: 7, icon: "🌸", name: "Nail Art Completa", price: 80, dur: "1h", cat: "Nail Art", desc: "Arte elaborada nas 10 unhas com elementos, glitter, pedras ou efeitos especiais.", badge: "Popular" },
  { id: 8, icon: "🔮", name: "Efeito Chrome/Mirror", price: 60, dur: "45 min", cat: "Nail Art", desc: "Efeito espelhado em pó chrome sobre gel ou esmalte. Acabamento holográfico.", badge: null },
  { id: 9, icon: "💆", name: "Spa de Mãos Completo", price: 90, dur: "1h15", cat: "Spa & Cuidados", desc: "Esfoliação, parafina, hidratação, massagem relaxante e esmaltação completa.", badge: "Especial" },
  { id: 10, icon: "🌺", name: "Pedicure Spa", price: 80, dur: "1h", cat: "Pés", desc: "Pedicure completa com esfoliação, hidratação dos pés, cutícula e esmaltação.", badge: null },
  { id: 11, icon: "🌺", name: "Pedicure Simples", price: 45, dur: "45 min", cat: "Pés", desc: "Cutícula, lixamento e esmaltação dos pés com acabamento cuidadoso.", badge: null },
  { id: 12, icon: "🦋", name: "Press-On Personalizadas", price: 120, dur: "1h", cat: "Nail Art", desc: "Unhas postiças customizadas e aplicadas. Kit para reutilização incluso.", badge: null },
];

const CATEGORIES = ["Todos", "Mãos", "Gel & Acrílico", "Nail Art", "Spa & Cuidados", "Pés"];

export default function Services({ setPage }) {
  const [activeCat, setActiveCat] = useState("Todos");

  const filtered = activeCat === "Todos"
    ? ALL_SERVICES
    : ALL_SERVICES.filter(s => s.cat === activeCat);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, var(--blush) 0%, var(--nude) 100%)",
        padding: "64px 0 56px", textAlign: "center",
        borderBottom: "1px solid var(--nude)"
      }}>
        <div className="container">
          <span className="section-label">Cardápio completo</span>
          <h1 className="section-title">Nossos <em>serviços</em></h1>
          <p style={{ color: "var(--ink-lt)", marginTop: 16, maxWidth: 540, marginInline: "auto", lineHeight: 1.8 }}>
            Do básico ao mais elaborado, temos o serviço perfeito para cada ocasião e estilo.
          </p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{
        background: "var(--white)", borderBottom: "1px solid var(--nude)",
        position: "sticky", top: 72, zIndex: 50,
        boxShadow: "0 2px 12px rgba(42,31,28,.06)"
      }}>
        <div className="container" style={{ display: "flex", gap: 4, overflowX: "auto", padding: "12px 24px" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: "8px 20px", borderRadius: "var(--radius-xl)", whiteSpace: "nowrap",
                fontSize: ".875rem", fontWeight: activeCat === cat ? 500 : 400,
                background: activeCat === cat ? "var(--rose)" : "transparent",
                color: activeCat === cat ? "var(--white)" : "var(--ink-lt)",
                border: `1.5px solid ${activeCat === cat ? "var(--rose)" : "var(--nude)"}`,
                transition: "all .2s", cursor: "pointer"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section>
        <div className="container">
          <div style={{ marginBottom: 16, color: "var(--ink-lt)", fontSize: ".875rem" }}>
            {filtered.length} serviço{filtered.length !== 1 ? "s" : ""} {activeCat !== "Todos" ? `em "${activeCat}"` : "disponíveis"}
          </div>
          <div className="services-grid">
            {filtered.map(s => (
              <div className="service-card" key={s.id}>
                {s.badge && <span className="service-badge">{s.badge}</span>}
                <div className="service-icon">{s.icon}</div>
                <div style={{
                  display: "inline-block", background: "var(--blush)", color: "var(--rose)",
                  fontSize: ".7rem", padding: "3px 10px", borderRadius: "var(--radius-xl)",
                  marginBottom: 10, fontWeight: 500, letterSpacing: ".05em"
                }}>{s.cat}</div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-footer">
                  <span className="service-price">R$ {s.price}</span>
                  <span className="service-dur">⏱ {s.dur}</span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: 16, padding: "11px 20px", fontSize: ".875rem", justifyContent: "center" }}
                  onClick={() => setPage("schedule")}
                >
                  Agendar este serviço
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE NOTE */}
      <section style={{ background: "var(--blush)", padding: "48px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 12 }}>
            Pacotes e <em>combos especiais</em>
          </h3>
          <p style={{ color: "var(--ink-lt)", maxWidth: 540, marginInline: "auto", lineHeight: 1.8, marginBottom: 28 }}>
            Combine serviços e economize! Pergunte sobre nossos pacotes mensais e planos de fidelidade com descontos exclusivos.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/5511999998888?text=Olá! Gostaria de saber sobre os pacotes especiais."
              className="btn btn-gold"
              target="_blank" rel="noopener noreferrer"
            >
              💬 Consultar pacotes
            </a>
            <button className="btn btn-primary" onClick={() => setPage("schedule")}>
              ✦ Agendar agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
