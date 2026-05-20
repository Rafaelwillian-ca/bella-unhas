const API_URL = process.env.REACT_APP_API_URL || 'https://bella-unhas-api-production.up.railway.app';

export const api = {
  get: (path) => fetch(`${API_URL}${path}`).then(r => r.json()),
  post: (path, body) => fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json()),
  patch: (path, body) => fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json()),
  delete: (path) => fetch(`${API_URL}${path}`, { method: 'DELETE' }).then(r => r.json()),
};
