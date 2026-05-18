# ✦ Bella Unhas Studio — Website Completo

Website profissional para salão de manicure com frontend React, backend Node.js/Express e banco de dados MySQL.

---

## 📁 Estrutura do Projeto

```
manicure-salon/
├── src/                        # Frontend React
│   ├── App.jsx                 # App principal + navegação
│   ├── styles.css              # Design system completo
│   └── pages/
│       ├── Home.jsx            # Página inicial
│       ├── Services.jsx        # Catálogo de serviços
│       ├── Schedule.jsx        # Agendamento online
│       ├── Contact.jsx         # Formulário de contato
│       └── Admin.jsx           # Painel administrativo
├── backend/
│   ├── server.js               # API REST (Express)
│   └── package.json
├── database/
│   └── schema.sql              # Estrutura + dados iniciais MySQL
├── .env.example                # Variáveis de ambiente
└── README.md
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

---

### 1️⃣ Banco de Dados (MySQL)

```bash
# Acesse o MySQL
mysql -u root -p

# Execute o schema (cria banco, tabelas e dados iniciais)
mysql -u root -p < database/schema.sql
```

---

### 2️⃣ Backend (Node.js + Express)

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp ../.env.example .env
# Edite .env com suas credenciais MySQL e SMTP

# Desenvolvimento (hot-reload)
npm run dev

# Produção
npm start
```

A API estará disponível em: **http://localhost:4000**

---

### 3️⃣ Frontend (React)

```bash
# Na raiz do projeto
npm install   # ou: yarn install

# Desenvolvimento
npm start     # Abre em http://localhost:3000

# Build para produção
npm run build
```

---

## 🔌 Exemplos de Requisições à API

### Serviços

```bash
# Listar todos os serviços
GET http://localhost:4000/api/servicos

# Criar serviço
POST http://localhost:4000/api/servicos
Content-Type: application/json
{
  "nome": "Nail Art Francesa",
  "preco": 45.00,
  "duracao_minutos": 40,
  "descricao": "Francesa clássica ou colorida"
}

# Atualizar serviço
PUT http://localhost:4000/api/servicos/1
Content-Type: application/json
{ "nome": "Esmaltação Simples", "preco": 38.00 }

# Deletar serviço
DELETE http://localhost:4000/api/servicos/1
```

### Clientes

```bash
# Listar todos
GET http://localhost:4000/api/clientes

# Perfil com histórico de reservas
GET http://localhost:4000/api/clientes/1

# Cadastrar cliente
POST http://localhost:4000/api/clientes
Content-Type: application/json
{
  "nome": "Maria Oliveira",
  "telefone": "11988887777",
  "email": "maria@email.com"
}
```

### Reservas

```bash
# Listar todas as reservas
GET http://localhost:4000/api/reservas

# Filtrar por data
GET http://localhost:4000/api/reservas?data=2025-01-20

# Filtrar por status
GET http://localhost:4000/api/reservas?status=pendente

# Verificar horários disponíveis em uma data
GET http://localhost:4000/api/reservas/disponiveis?data=2025-01-20

# Criar reserva (envia e-mail automático)
POST http://localhost:4000/api/reservas
Content-Type: application/json
{
  "nome": "Juliana Silva",
  "telefone": "11955554444",
  "email": "ju@email.com",
  "servico_id": 3,
  "data": "2025-01-25",
  "horario": "14:00",
  "observacoes": "Quero nude com glitter"
}

# Confirmar reserva
PATCH http://localhost:4000/api/reservas/1/status
Content-Type: application/json
{ "status": "confirmado" }

# Cancelar reserva
DELETE http://localhost:4000/api/reservas/1
```

---

## 🎨 Páginas do Frontend

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Hero, galeria, depoimentos, CTA |
| Serviços | Clique em "Serviços" | Catálogo com filtros por categoria |
| Agendar | Clique em "Agendar" | Formulário + seleção de horários |
| Contato | Clique em "Contato" | Formulário + informações + mapa |
| Admin | Rodapé → Área Admin | Painel com senha `admin123` |

---

## 🔐 Painel Administrativo

Acesse pelo rodapé do site → **Área Admin**  
Senha demo: **`admin123`**

Funcionalidades:
- 📊 Dashboard com métricas e gráficos
- 📅 Gerenciar reservas (confirmar/cancelar)
- 👥 Histórico de clientes
- 💅 Desempenho por serviço
- 💬 Contato direto via WhatsApp

---

## ✉️ E-mail Automático (Nodemailer)

Configure no `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_USER=seu@gmail.com
SMTP_PASS=sua_app_password   ← Gere em: myaccount.google.com/apppasswords
```

O e-mail é enviado automaticamente ao criar uma reserva via `POST /api/reservas`.

---

## 💬 Integração WhatsApp

O botão flutuante e links no painel admin usam a URL:
```
https://wa.me/5511999998888?text=Olá! Gostaria de agendar.
```

Para **WhatsApp Business API** com envio automático, integre o **Twilio** ou **Z-API**:
```bash
npm install twilio
```
```js
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
await client.messages.create({
  from: 'whatsapp:+14155238886',
  to: `whatsapp:+55${telefone}`,
  body: `✦ Olá ${nome}! Reserva confirmada para ${data} às ${horario}.`
});
```

---

## 💳 Pagamento Online

### Stripe
```bash
npm install stripe
```
```js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{ price_data: { currency: 'brl', product_data: { name: servico }, unit_amount: preco * 100 }, quantity: 1 }],
  mode: 'payment',
  success_url: `${process.env.FRONTEND_URL}/sucesso`,
  cancel_url:  `${process.env.FRONTEND_URL}/cancelado`,
});
```

### PagSeguro / MercadoPago
Consulte: https://www.mercadopago.com.br/developers

---

## 🌐 Deploy Recomendado

| Camada | Serviço Gratuito |
|--------|-----------------|
| Frontend | Vercel, Netlify |
| Backend | Railway, Render |
| Banco | PlanetScale (MySQL), Railway |

---

## 📦 Dependências

### Frontend
- React 18
- Fontes: Playfair Display, Cormorant Garamond, DM Sans
- CSS puro (sem biblioteca)

### Backend
```json
{
  "express": "^4.18",
  "mysql2": "^3.6",
  "nodemailer": "^6.9",
  "cors": "^2.8",
  "nodemon": "^3.0 (dev)"
}
```

---

## 🎨 Design System

Variáveis CSS principais:
```css
--rose:    #c8756b   /* Rosa principal */
--gold:    #b8966e   /* Dourado accent */
--blush:   #f7ece9   /* Fundo suave */
--ink:     #2a1f1c   /* Texto escuro */
--cream:   #fdf8f5   /* Background */
```

---

*Desenvolvido com 💅 para o Bella Unhas Studio*
