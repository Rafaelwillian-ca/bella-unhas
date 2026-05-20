import React, { useEffect, useState } from 'react';
import { api } from '../api';

const STATUS_COLORS = { pendente: '#f39c12', confirmado: '#27ae60', cancelado: '#e74c3c' };
const STATUS_BG = { pendente: '#fef9e7', confirmado: '#eafaf1', cancelado: '#fde8e8' };

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const carregar = () => {
    setLoading(true);
    let url = '/api/reservas?';
    if (filtroData) url += `data=${filtroData}&`;
    if (filtroStatus) url += `status=${filtroStatus}`;
    api.get(url).then(setReservas).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, [filtroData, filtroStatus]);

  const mudarStatus = async (id, status) => {
    await api.patch(`/api/reservas/${id}/status`, { status });
    carregar();
  };

  const cancelar = async (id) => {
    if (window.confirm('Cancelar esta reserva?')) {
      await api.delete(`/api/reservas/${id}`);
      carregar();
    }
  };

  const inputStyle = { padding: '10px 16px', border: '2px solid #f0ddd5', borderRadius: 10, fontSize: '0.9rem', color: '#3a2a2e', fontFamily: "'Lato', sans-serif", outline: 'none' };

  return (
    <div style={{ paddingTop: 70, minHeight: '100vh', background: '#fdf6f0' }}>
      <div style={{ background: '#3a2a2e', padding: '48px 24px 40px', textAlign: 'center' }}>
        <p style={{ color: '#c9956b', fontWeight: 700, letterSpacing: 3, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 12 }}>✦ Painel</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fdf6f0', fontSize: '2.2rem' }}>Administração</h1>
        <p style={{ color: '#c8a4a5', fontWeight: 300, marginTop: 8 }}>Gerenciamento de reservas</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { label: 'Total', valor: reservas.length, cor: '#8b4f5e' },
            { label: 'Pendentes', valor: reservas.filter(r => r.status === 'pendente').length, cor: '#f39c12' },
            { label: 'Confirmados', valor: reservas.filter(r => r.status === 'confirmado').length, cor: '#27ae60' },
            { label: 'Cancelados', valor: reservas.filter(r => r.status === 'cancelado').length, cor: '#e74c3c' },
          ].map(item => (
            <div key={item.label} style={{ background: '#fff', borderRadius: 16, padding: '24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(139,79,94,0.08)', borderTop: `4px solid ${item.cor}` }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: item.cor, fontWeight: 700 }}>{item.valor}</div>
              <div style={{ color: '#7a5c64', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', marginBottom: 28, boxShadow: '0 4px 20px rgba(139,79,94,0.08)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>FILTRAR POR DATA</label>
            <input type="date" value={filtroData} onChange={e => setFiltroData(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: '#7a5c64', marginBottom: 8, letterSpacing: 0.5 }}>STATUS</label>
            <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} style={inputStyle}>
              <option value="">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <button onClick={() => { setFiltroData(''); setFiltroStatus(''); }} style={{ background: '#f5e8df', color: '#8b4f5e', padding: '10px 20px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
            Limpar filtros
          </button>
        </div>

        {/* Lista */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8b4f5e' }}>Carregando...</div>
        ) : reservas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#7a5c64', background: '#fff', borderRadius: 16 }}>Nenhuma reserva encontrada.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reservas.map(r => (
              <div key={r.id} style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 4px 20px rgba(139,79,94,0.08)', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', borderLeft: `4px solid ${STATUS_COLORS[r.status]}` }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#3a2a2e', fontSize: '1.05rem' }}>{r.cliente_nome}</h3>
                    <span style={{ background: STATUS_BG[r.status], color: STATUS_COLORS[r.status], padding: '3px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </div>
                  <p style={{ color: '#7a5c64', fontSize: '0.9rem', marginBottom: 4 }}>💅 {r.servico_nome} · <strong style={{ color: '#8b4f5e' }}>R$ {Number(r.preco).toFixed(2).replace('.', ',')}</strong></p>
                  <p style={{ color: '#7a5c64', fontSize: '0.85rem', marginBottom: 4 }}>📅 {new Date(r.data + 'T12:00:00').toLocaleDateString('pt-BR')} às {r.horario.slice(0,5)}</p>
                  <p style={{ color: '#7a5c64', fontSize: '0.85rem' }}>📱 {r.telefone}</p>
                  {r.observacoes && <p style={{ color: '#c9956b', fontSize: '0.82rem', marginTop: 6 }}>💬 {r.observacoes}</p>}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {r.status === 'pendente' && (
                    <button onClick={() => mudarStatus(r.id, 'confirmado')} style={{ background: '#eafaf1', color: '#27ae60', padding: '8px 18px', borderRadius: 20, fontWeight: 700, border: '1px solid #27ae60', cursor: 'pointer', fontSize: '0.85rem' }}>
                      ✓ Confirmar
                    </button>
                  )}
                  {r.status !== 'cancelado' && (
                    <button onClick={() => cancelar(r.id)} style={{ background: '#fde8e8', color: '#e74c3c', padding: '8px 18px', borderRadius: 20, fontWeight: 700, border: '1px solid #e74c3c', cursor: 'pointer', fontSize: '0.85rem' }}>
                      ✕ Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
