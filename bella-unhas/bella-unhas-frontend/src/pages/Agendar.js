import React, { useEffect, useState } from 'react';
import { api } from '../api';

const inputStyle = {
  width: '100%', padding: '14px 16px', border: '2px solid #f0ddd5',
  borderRadius: 10, fontSize: '0.95rem', color: '#3a2a2e',
  background: '#fff', outline: 'none', transition: 'border 0.2s',
  fontFamily: "'Lato', sans-serif",
};

export default function Agendar() {
  const [servicos, setServicos] = useState([]);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', servico_id: '', data: '', horario: '', observacoes: '' });
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/api/servicos').then(setServicos).catch(() => {});
  }, []);

  useEffect(() => {
    if (form.data) {
      api.get(`/api/reservas/disponiveis?data=${form.data}`)
        .then(res => setSlots(res.slots || []))
        .catch(() => setSlots([]));
    } else {
      setSlots([]);
    }
    setForm(f => ({ ...f, horario: '' }));
  }, [form.data]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErro(''); setSucesso(false);
    try {
      const res = await api.post('/api/reservas', { ...form, servico_id: Number(form.servico_id) });
      if (res.error) { setErro(res.error); }
      else { setSucesso(true); setForm({ nome: '', telefone: '', email: '', servico_id: '', data: '', horario: '', observacoes: '' }); }
    } catch { setErro('Erro ao fazer o agendamento. Tente novamente.'); }
    finally { setLoading(false); }
  };

  const hoje = new Date().toISOString().split('T')[0];

  if (sucesso) return (
    <div style={{ paddingTop: 70, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fdf6f0, #f5e8df)' }}>
      <div style={{ textAlign: 'center', padding: 48, background: '#fff', borderRadius: 24, boxShadow: '0 8px 40px rgba(139,79,94,0.12)', maxWidth: 460 }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🌸</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.8rem', marginBottom: 12 }}>Agendamento Confirmado!</h2>
        <p style={{ color: '#7a5c64', fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>Seu horário foi reservado com sucesso. Aguardamos você!</p>
        <button onClick={() => setSucesso(false)} style={{ background: '#8b4f5e', color: '#fff', padding: '14px 32px', borderRadius: 50, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
          Fazer outro agendamento
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{ background: 'linear-gradient(135deg, #fdf6f0, #f5e8df)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p style={{ color: '#c9956b', fontWeight: 700, letterSpacing: 3, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 16 }}>✦ Reserve seu horário</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#3a2a2e', marginBottom: 12 }}>Agendamento Online</h1>
        <div style={{ width: 60, height: 3, background: '#c9956b', margin: '12px auto', borderRadius: 2 }} />
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 24, padding: 'clamp(28px, 5vw, 48px)', boxShadow: '0 8px 40px rgba(139,79,94,0.10)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.5rem', marginBottom: 32 }}>Preencha seus dados</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>NOME COMPLETO *</label>
              <input name="nome" value={form.nome} onChange={handleChange} required style={inputStyle} placeholder="Seu nome" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>TELEFONE/WHATSAPP *</label>
              <input name="telefone" value={form.telefone} onChange={handleChange} required style={inputStyle} placeholder="(00) 00000-0000" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>E-MAIL</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="seu@email.com" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>SERVIÇO *</label>
            <select name="servico_id" value={form.servico_id} onChange={handleChange} required style={inputStyle}>
              <option value="">Selecione um serviço</option>
              {servicos.map(s => (
                <option key={s.id} value={s.id}>{s.nome} — R$ {Number(s.preco).toFixed(2).replace('.', ',')}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>DATA *</label>
              <input name="data" type="date" value={form.data} onChange={handleChange} required min={hoje} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>HORÁRIO *</label>
              <select name="horario" value={form.horario} onChange={handleChange} required style={inputStyle} disabled={!form.data}>
                <option value="">{form.data ? 'Escolha um horário' : 'Selecione a data primeiro'}</option>
                {slots.map(s => (
                  <option key={s.horario} value={s.horario} disabled={!s.disponivel}>
                    {s.horario} {!s.disponivel ? '(ocupado)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>OBSERVAÇÕES</label>
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Alguma informação adicional?" />
          </div>

          {erro && <div style={{ background: '#fde8e8', color: '#c0392b', padding: '14px 20px', borderRadius: 10, marginBottom: 20, fontSize: '0.9rem' }}>{erro}</div>}

          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#c8a4a5' : '#8b4f5e', color: '#fff', padding: '16px', borderRadius: 50, fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}>
            {loading ? 'Agendando...' : 'Confirmar Agendamento ✦'}
          </button>
        </form>
      </div>
    </div>
  );
}
