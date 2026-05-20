import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    background: 'rgba(253,246,240,0.97)',
    boxShadow: '0 2px 20px rgba(139,79,94,0.12)',
    backdropFilter: 'blur(10px)',
  },
  navTop: { background: 'transparent' },
  inner: {
    maxWidth: 1100, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 70,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem', fontWeight: 700,
    color: '#8b4f5e',
  },
  links: { display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' },
  link: { fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#3a2a2e', transition: 'color 0.2s' },
  linkActive: { color: '#8b4f5e' },
  cta: {
    background: '#8b4f5e', color: '#fff',
    padding: '10px 24px', borderRadius: 50,
    fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', fontWeight: 700,
    letterSpacing: 0.5, transition: 'all 0.3s',
  },
  hamburger: { display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', background: 'none', border: 'none', padding: 4 },
  bar: { width: 24, height: 2, background: '#8b4f5e', borderRadius: 2, transition: 'all 0.3s' },
  mobileMenu: {
    position: 'fixed', top: 70, left: 0, right: 0,
    background: 'rgba(253,246,240,0.98)', backdropFilter: 'blur(10px)',
    padding: '24px', display: 'flex', flexDirection: 'column', gap: 20,
    boxShadow: '0 8px 24px rgba(139,79,94,0.15)',
  },
  mobileLink: { fontFamily: "'Lato', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#3a2a2e', letterSpacing: 1, textTransform: 'uppercase' },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{ ...styles.nav, ...(scrolled || open ? styles.navScrolled : styles.navTop) }}>
        <div style={styles.inner}>
          <Link to="/" style={styles.logo}>✦ Bella Unhas</Link>
          <ul style={styles.links} className="nav-links">
            {[['/', 'Início'], ['/servicos', 'Serviços'], ['/agendar', 'Agendar'], ['/contato', 'Contato']].map(([path, label]) => (
              <li key={path}>
                {path === '/agendar'
                  ? <Link to={path} style={styles.cta}>Agendar</Link>
                  : <Link to={path} style={{ ...styles.link, ...(isActive(path) ? styles.linkActive : {}) }}>{label}</Link>
                }
              </li>
            ))}
          </ul>
          <button style={styles.hamburger} onClick={() => setOpen(!open)} className="hamburger">
            <span style={styles.bar} />
            <span style={styles.bar} />
            <span style={styles.bar} />
          </button>
        </div>
      </nav>
      {open && (
        <div style={styles.mobileMenu}>
          {[['/', 'Início'], ['/servicos', 'Serviços'], ['/agendar', 'Agendar'], ['/contato', 'Contato']].map(([path, label]) => (
            <Link key={path} to={path} style={styles.mobileLink}>{label}</Link>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
