import { useState } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "services", label: "Serviços" },
    { id: "schedule", label: "Agendar" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <div className="app">
      {/* NAV */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setPage("home")}>
          <span className="brand-icon">✦</span>
          <span className="brand-name">Bella Unhas</span>
        </div>
        <ul className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-btn ${page === item.id ? "active" : ""}`}
                onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="nav-btn cta-nav"
              onClick={() => { setPage("schedule"); setMobileMenuOpen(false); }}
            >
              Agendar Agora
            </button>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* PAGE CONTENT */}
      <main>
        {page === "home" && <Home setPage={setPage} />}
        {page === "services" && <Services setPage={setPage} />}
        {page === "schedule" && <Schedule />}
        {page === "contact" && <Contact />}
        {page === "admin" && <Admin />}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-icon">✦</span>
            <span className="brand-name">Bella Unhas</span>
            <p>Arte nas pontas dos dedos.</p>
          </div>
          <div className="footer-links">
            <h4>Navegação</h4>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)}>{item.label}</button>
            ))}
          </div>
          <div className="footer-contact">
            <h4>Contato</h4>
            <p>📍 Rua das Flores, 123 – Centro</p>
            <p>📞 (11) 99999-8888</p>
            <p>✉️ contato@bellaunhas.com.br</p>
            <p>⏰ Seg–Sáb: 09h às 19h</p>
          </div>
          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-icons">
              <a href="#" aria-label="Instagram">📸 Instagram</a>
              <a href="#" aria-label="WhatsApp">💬 WhatsApp</a>
              <a href="#" aria-label="Facebook">👍 Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Bella Unhas — Todos os direitos reservados.</p>
          <button className="admin-link" onClick={() => setPage("admin")}>Área Admin</button>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/5511999998888?text=Olá! Gostaria de agendar um horário."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
