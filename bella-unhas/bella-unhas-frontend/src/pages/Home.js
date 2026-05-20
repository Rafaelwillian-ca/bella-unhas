import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Home() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    api.get('/api/servicos').then(data => setServicos(data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #fdf6f0 0%, #f5e8df 50%, #ead4c8 100%)',
        position: 'relative', overflow: 'hidden', padding: '100px 24px 60px',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,164,165,0.2)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(139,79,94,0.08)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, animation: 'fadeUp 0.8s ease forwards' }}>
            <p style={{ color: '#c9956b', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 20 }}>✦ Salão de Manicure</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#3a2a2e', lineHeight: 1.15, marginBottom: 24 }}>
              Beleza que<br /><em style={{ color: '#8b4f5e' }}>transforma</em>
            </h1>
            <p style={{ color: '#7a5c64', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 40, maxWidth: 420 }}>
              Unhas impecáveis, atendimento especial e um espaço feito para você se sentir incrível.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/agendar" className="btn-primary" style={{ background: '#8b4f5e', color: '#fff', padding: '16px 36px', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem', letterSpacing: 0.5 }}>Agendar Agora</Link>
              <Link to="/servicos" style={{ border: '2px solid #8b4f5e', color: '#8b4f5e', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem', letterSpacing: 0.5, transition: 'all 0.3s' }}>Ver Serviços</Link>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 320, height: 360, background: 'linear-gradient(145deg, #c8a4a5, #8b4f5e)', borderRadius: '60% 40% 50% 50% / 60% 50% 50% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', boxShadow: '0 20px 60px rgba(139,79,94,0.3)' }}>
              💅
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#3a2a2e', marginBottom: 12 }}>Por que nos escolher?</h2>
            <div style={{ width: 60, height: 3, background: '#c9956b', margin: '0 auto', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { icon: '✨', title: 'Qualidade Premium', desc: 'Produtos de alta qualidade para um resultado impecável e duradouro.' },
              { icon: '🕐', title: 'Horários Flexíveis', desc: 'Atendimento de segunda a sábado, com horários que cabem na sua rotina.' },
              { icon: '💎', title: 'Profissionais Experientes', desc: 'Equipe treinada e apaixonada pelo que faz.' },
              { icon: '🌸', title: 'Ambiente Aconchegante', desc: 'Um espaço pensado para você relaxar e se sentir em casa.' },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: 'center', padding: '36px 24px', borderRadius: 16, background: '#fdf6f0', transition: 'all 0.3s' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#3a2a2e', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: '#7a5c64', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS DESTAQUE */}
      {servicos.length > 0 && (
        <section style={{ padding: '80px 24px', background: '#fdf6f0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#3a2a2e', marginBottom: 12 }}>Serviços em Destaque</h2>
              <div style={{ width: 60, height: 3, background: '#c9956b', margin: '0 auto', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28, marginBottom: 48 }}>
              {servicos.map(s => (
                <div key={s.id} style={{ background: '#fff', borderRadius: 16, padding: '32px 28px', boxShadow: '0 4px 24px rgba(139,79,94,0.08)', transition: 'all 0.3s' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.2rem', marginBottom: 8 }}>{s.nome}</h3>
                  <p style={{ color: '#7a5c64', fontSize: '0.88rem', fontWeight: 300, marginBottom: 20, lineHeight: 1.6 }}>{s.descricao}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b4f5e', fontWeight: 700, fontSize: '1.3rem', fontFamily: "'Playfair Display', serif" }}>
                      R$ {Number(s.preco).toFixed(2).replace('.', ',')}
                    </span>
                    <span style={{ color: '#c9956b', fontSize: '0.85rem' }}>⏱ {s.duracao_minutos} min</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link to="/servicos" className="btn-primary" style={{ background: '#8b4f5e', color: '#fff', padding: '14px 36px', borderRadius: 50, fontWeight: 700 }}>Ver todos os serviços</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#8b4f5e', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#fff', marginBottom: 16 }}>
          Pronta para se sentir linda?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300, fontSize: '1.1rem', marginBottom: 40 }}>
          Agende agora e garanta seu horário!
        </p>
        <Link to="/agendar" style={{ background: '#fff', color: '#8b4f5e', padding: '16px 40px', borderRadius: 50, fontWeight: 700, fontSize: '1rem', display: 'inline-block', transition: 'all 0.3s' }}>
          Agendar Horário
        </Link>
      </section>
    </div>
  );
}
