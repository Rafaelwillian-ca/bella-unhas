import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#3a2a2e', color: '#c8a4a5', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#fdf6f0', fontSize: '1.4rem', marginBottom: 12 }}>✦ Bella Unhas Studio</h3>
            <p style={{ fontWeight: 300, fontSize: '0.9rem', maxWidth: 260, lineHeight: 1.7 }}>Cuidado e beleza para suas unhas com profissionalismo e carinho.</p>
          </div>
          <div>
            <h4 style={{ color: '#fdf6f0', marginBottom: 16, letterSpacing: 1, fontSize: '0.85rem', textTransform: 'uppercase' }}>Navegação</h4>
            {[['/', 'Início'], ['/servicos', 'Serviços'], ['/agendar', 'Agendar'], ['/contato', 'Contato']].map(([path, label]) => (
              <div key={path} style={{ marginBottom: 8 }}>
                <Link to={path} style={{ color: '#c8a4a5', fontSize: '0.9rem', transition: 'color 0.2s' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fdf6f0', marginBottom: 16, letterSpacing: 1, fontSize: '0.85rem', textTransform: 'uppercase' }}>Horários</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: 6 }}>Seg – Sex: 9h às 19h</p>
            <p style={{ fontSize: '0.9rem', marginBottom: 6 }}>Sáb: 9h às 17h</p>
            <p style={{ fontSize: '0.9rem' }}>Dom: Fechado</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #5a3a42', paddingTop: 24, textAlign: 'center', fontSize: '0.8rem', opacity: 0.7 }}>
          © {new Date().getFullYear()} Bella Unhas Studio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
