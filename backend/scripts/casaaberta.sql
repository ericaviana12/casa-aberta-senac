/* -------------------- CRIAR BANCO DE DADOS -------------------- */
CREATE DATABASE casaaberta;
USE casaaberta;

/* -------------------- TABELAS -------------------- */

-- Presenças
CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedbacks
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) DEFAULT 'Anônimo',
    comentario VARCHAR(1000) DEFAULT 'Sem comentário',
    estrelas INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_estrelas CHECK (estrelas BETWEEN 1 AND 5)
);

/* -------------------- TESTAR CONEXÃO COM O WORKBENCH -------------------- */
/* ---------- executar consultas para listar os dados inseridos ---------- */

SELECT * FROM presencas;
DESCRIBE presencas;

SELECT * FROM feedbacks;
DESCRIBE feedbacks;