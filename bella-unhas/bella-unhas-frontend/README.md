# Bella Unhas Studio — Frontend

Site completo para o salão de manicure Bella Unhas Studio.

## Páginas
- `/` — Home
- `/servicos` — Serviços
- `/agendar` — Agendamento online
- `/contato` — Contato
- `/admin` — Painel administrativo

## Como rodar localmente

```bash
npm install
npm start
```

## Deploy no Netlify

1. Faça o upload desta pasta no GitHub
2. No Netlify, conecte o repositório
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Em **Environment Variables**, adicione:
   - `REACT_APP_API_URL` = `https://bella-unhas-api-production.up.railway.app`
5. Deploy!

## API
O backend roda no Railway: `https://bella-unhas-api-production.up.railway.app`
