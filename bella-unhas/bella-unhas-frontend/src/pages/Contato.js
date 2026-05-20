import React from 'react';

export default function Contato() {
  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{ background: 'linear-gradient(135deg, #fdf6f0, #f5e8df)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p style={{ color: '#c9956b', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 16 }}>✦ Fale conosco</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#3a2a2e', marginBottom: 12 }}>Contato</h1>
        <div style={{ width: 60, height: 3, background: '#c9956b', margin: '12px auto', borderRadius: 2 }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.8rem', marginBottom: 32 }}>Informações</h2>
            {[
              { icon: '📍', title: 'Endereço', info: 'Rua das Flores, 123 — Centro' },
              { icon: '📱', title: 'WhatsApp', info: '(00) 99999-9999' },
              { icon: '📧', title: 'E-mail', info: 'contato@bellaunhas.com.br' },
              { icon: '🕐', title: 'Horários', info: 'Seg-Sex: 9h–19h | Sáb: 9h–17h' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 20, marginBottom: 28, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, background: '#fdf6f0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontWeight: 700, color: '#3a2a2e', marginBottom: 4, fontSize: '0.9rem', letterSpacing: 0.5 }}>{item.title}</p>
                  <p style={{ color: '#7a5c64', fontWeight: 300, fontSize: '0.95rem' }}>{item.info}</p>
                </div>
              </div>
            ))}

            <a href="https://wa.me/5500999999999" target="_blank" rel="noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '14px 32px', borderRadius: 50, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', marginTop: 8 }}>
              💬 Chamar no WhatsApp
            </a>
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 8px 40px rgba(139,79,94,0.10)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.5rem', marginBottom: 8 }}>Redes Sociais</h2>
            <p style={{ color: '#7a5c64', fontWeight: 300, marginBottom: 32, fontSize: '0.95rem' }}>Siga-nos e fique por dentro das novidades!</p>
            {[
              { icon: '📸', name: 'Instagram', handle: '@bellaunhasstudio', color: '#E1306C' },
              { icon: '👍', name: 'Facebook', handle: 'Bella Unhas Studio', color: '#1877F2' },
              { icon: '🎵', name: 'TikTok', handle: '@bellaunhas', color: '#000' },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid #f5e8df' }}>
                <div style={{ width: 44, height: 44, background: s.color + '15', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{s.icon}</div>
                <div>
                  <p style={{ fontWeight: 700, color: '#3a2a2e', fontSize: '0.9rem' }}>{s.name}</p>
                  <p style={{ color: s.color, fontSize: '0.85rem' }}>{s.handle}</p>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 32, padding: 24, background: '#fdf6f0', borderRadius: 16, textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: '#8b4f5e', fontSize: '1.1rem', marginBottom: 4 }}>"Beleza que transforma"</p>
              <p style={{ color: '#7a5c64', fontSize: '0.85rem', fontWeight: 300 }}>Bella Unhas Studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
