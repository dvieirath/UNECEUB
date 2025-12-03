📚 DOCUMENTAÇÃO DO SISTEMA DE AUTENTICAÇÃO UNECEUB (FULL STACK)
Este documento resume a implementação do fluxo de Cadastro e Login, utilizando o CPF como identificador principal (chave primária) em um ambiente Full Stack Customizado (React Native + Node.js/Express + PostgreSQL).

1. ⚙️ ARQUITETURA E CONFIGURAÇÃO DE AMBIENTE

Componente,Tecnologia,Função
Front-end (App),React Native (Expo),Lógica de validação e comunicação HTTP.
Back-end (API),"Node.js, Express, cors","Servidor de API, tratamento de CORS, criptografia e JWT."
Banco de Dados,PostgreSQL,Persistência de dados de usuário.
Segurança,bcryptjs & jsonwebtoken,Hashing de senhas e gestão de sessão.

1.1. Script de Execução Conjunta (package.json)
Para simplificar o desenvolvimento, o concurrently foi configurado para iniciar o Front-end e o Back-end com um único comando.

(No package.json na raiz do projeto)

"scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    
    "backend": "node ../backend-api/server.js", 
    "dev": "concurrently \"npm run start\" \"npm run backend\""
},

Para iniciar o projeto:

npm run dev

2. 💾 ESTRUTURA DO BANCO DE DADOS (PostgreSQL)
O script abaixo deve ser executado no seu servidor PostgreSQL para criar a tabela users.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_cpf ON users (cpf);
