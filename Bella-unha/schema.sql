-- ============================================================
--  Bella Unhas Studio — Banco de Dados MySQL
--  Execute: mysql -u root -p < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS bella_unhas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bella_unhas;

-- ─── CLIENTES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clientes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(120)  NOT NULL,
  telefone   VARCHAR(20)   NOT NULL UNIQUE,
  email      VARCHAR(120),
  criado_em  DATETIME      DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_telefone (telefone)
) ENGINE=InnoDB;

-- ─── SERVIÇOS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS servicos (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nome             VARCHAR(100)   NOT NULL,
  preco            DECIMAL(8,2)   NOT NULL,
  duracao_minutos  INT,
  descricao        TEXT,
  ativo            TINYINT(1)     DEFAULT 1,
  criado_em        DATETIME       DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─── RESERVAS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  data        DATE         NOT NULL,
  horario     TIME         NOT NULL,
  cliente_id  INT          NOT NULL,
  servico_id  INT          NOT NULL,
  observacoes TEXT,
  status      ENUM('pendente','confirmado','cancelado') DEFAULT 'pendente',
  criado_em   DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (servico_id) REFERENCES servicos(id),
  INDEX idx_data_horario (data, horario),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- ─── SEED: SERVIÇOS ──────────────────────────────────────────
INSERT INTO servicos (nome, preco, duracao_minutos, descricao) VALUES
  ('Esmaltação Simples',    35.00,  30,  'Esmaltação caprichada com base, cor e finalizador.'),
  ('Esmaltação em Gel',     55.00,  45,  'Esmalte gel que dura até 2 semanas sem descascar.'),
  ('Gel UV Alongamento',   150.00, 120, 'Alongamento em gel com molde.'),
  ('Manutenção de Gel',     90.00,  60,  'Refil do gel já aplicado.'),
  ('Acrílico com Fibra',   170.00, 150, 'Acrílico reforçado com fibra de vidro.'),
  ('Nail Art Simples',      25.00,  20,  'Design em 2 unhas.'),
  ('Nail Art Completa',     80.00,  60,  'Arte elaborada nas 10 unhas.'),
  ('Efeito Chrome/Mirror',  60.00,  45,  'Efeito espelhado em pó chrome.'),
  ('Spa de Mãos Completo',  90.00,  75,  'Esfoliação, parafina e massagem.'),
  ('Pedicure Spa',          80.00,  60,  'Pedicure completa com hidratação.'),
  ('Pedicure Simples',      45.00,  45,  'Cutícula, lixamento e esmaltação.'),
  ('Press-On Personalizadas',120.00, 60, 'Unhas postiças customizadas.');

-- ─── SEED: CLIENTES DEMO ─────────────────────────────────────
INSERT INTO clientes (nome, telefone, email) VALUES
  ('Ana Paula Souza',  '11987654321', 'ana@email.com'),
  ('Beatriz Lima',     '11912345678', 'beatriz@email.com'),
  ('Camila Santos',    '11977778888', 'camila@email.com'),
  ('Daniela Rocha',    '11999991111', 'daniela@email.com');

-- ─── SEED: RESERVAS DEMO ─────────────────────────────────────
INSERT INTO reservas (data, horario, cliente_id, servico_id, status) VALUES
  (CURDATE(), '10:00', 1, 3, 'confirmado'),
  (CURDATE(), '14:00', 2, 7, 'confirmado'),
  (DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00', 3, 9, 'pendente'),
  (DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:00', 4, 1, 'pendente');
