CREATE DATABASE IF NOT EXISTS bella_unhas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bella_unhas;

CREATE TABLE IF NOT EXISTS clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(120) NOT NULL,
  telefone  VARCHAR(20)  NOT NULL UNIQUE,
  email     VARCHAR(120),
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicos (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nome            VARCHAR(100)  NOT NULL,
  preco           DECIMAL(8,2)  NOT NULL,
  duracao_minutos INT,
  descricao       TEXT,
  ativo           TINYINT(1) DEFAULT 1,
  criado_em       DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  data        DATE NOT NULL,
  horario     TIME NOT NULL,
  cliente_id  INT  NOT NULL,
  servico_id  INT  NOT NULL,
  observacoes TEXT,
  status      ENUM('pendente','confirmado','cancelado') DEFAULT 'pendente',
  criado_em   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (servico_id) REFERENCES servicos(id)
);

INSERT INTO servicos (nome, preco, duracao_minutos, descricao) VALUES
  ('Esmaltacao Simples',     35.00,  30,  'Esmaltacao com base, cor e finalizador.'),
  ('Esmaltacao em Gel',      55.00,  45,  'Dura ate 2 semanas sem descascar.'),
  ('Gel UV Alongamento',    150.00, 120,  'Alongamento em gel com molde.'),
  ('Manutencao de Gel',      90.00,  60,  'Refil do gel ja aplicado.'),
  ('Nail Art Completa',      80.00,  60,  'Arte nas 10 unhas.'),
  ('Efeito Chrome',          60.00,  45,  'Efeito espelhado.'),
  ('Spa de Maos Completo',   90.00,  75,  'Esfoliacao, parafina e massagem.'),
  ('Pedicure Spa',           80.00,  60,  'Pedicure completa com hidratacao.'),
  ('Pedicure Simples',       45.00,  45,  'Cuticula, lixamento e esmaltacao.');
