import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/servicos')
      .then(data => setServicos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categorias = {
    'Esmaltação': servicos.filter(s => s.nome.toLowerCase().includes('esmalт') || s.nome.toLowerCase().includes('esmal')),
    'Gel & Alongamento': servicos.filter(s => s.nome.toLowerCase().includes('gel') || s.nome.toLowerCase().includes('along')),
    'Nail Art': servicos.filter(s => s.nome.toLowerCase().includes('nail') || s.nome.toLowerCase().includes('art') || s.nome.toLowerCase().includes('chrome')),
    'Spa & Cuidados': servicos.filter(s => s.nome.toLowerCase().includes('spa') || s.nome.toLowerCase().includes('pedicure') || s.nome.toLowerCase().includes('manu')),
  };

  const cats = Object.entries(categorias).filter(([, items]) => items.length > 0);
  const semCategoria = servicos.filter(s => !cats.flatMap(([, items]) => items).includes(s));

  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{ background: 'linear-gradient(135deg, #fdf6f0, #f5e8df)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p style={{ color: '#c9956b', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 16 }}>✦ O que oferecemos</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#3a2a2e', marginBottom: 12 }}>Nossos Serviços</h1>
        <div style={{ width: 60, height: 3, background: '#c9956b', margin: '12px auto 20px', borderRadius: 2 }} />
        <p style={{ color: '#7a5c64', fontWeight: 300, fontSize: '1.05rem' }}>Escolha o serviço perfeito para você</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8b4f5e', fontSize: '1.1rem' }}>Carregando serviços...</div>
        ) : servicos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#7a5c64' }}>Nenhum serviço disponível.</div>
        ) : (
          <>
            {[...cats, semCategoria.length > 0 ? ['Outros', semCategoria] : null].filter(Boolean).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 56 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#8b4f5e', marginBottom: 8 }}>{cat}</h2>
                <div style={{ width: 40, height: 2, background: '#c9956b', borderRadius: 2, marginBottom: 28 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                  {items.map(s => (
                    <div key={s.id} style={{ background: '#fff', borderRadius: 16, padding: '28px 24px', boxShadow: '0 4px 20px rgba(139,79,94,0.08)', transition: 'all 0.3s', border: '1px solid #f5e8df' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.15rem', marginBottom: 8 }}>{s.nome}</h3>
                      {s.descricao && <p style={{ color: '#7a5c64', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.6, marginBottom: 20 }}>{s.descricao}</p>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f5e8df' }}>
                        <span style={{ color: '#8b4f5e', fontWeight: 700, fontSize: '1.25rem', fontFamily: "'Playfair Display', serif" }}>
                          R$ {Number(s.preco).toFixed(2).replace('.', ',')}
                        </span>
                        {s.duracao_minutos && <span style={{ color: '#c9956b', fontSize: '0.85rem', background: '#fdf6f0', padding: '4px 12px', borderRadius: 20 }}>⏱ {s.duracao_minutos} min</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/agendar" style={{ background: '#8b4f5e', color: '#fff', padding: '16px 40px', borderRadius: 50, fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>
            Agendar Horário
          </Link>
        </div>
      </div>
    </div>
  );
}
