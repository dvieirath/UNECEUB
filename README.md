# 🚀 UNECEUB - Portal do Aluno (Mobile - React Native)

Este repositório contém o código do aplicativo móvel para o Portal do Aluno da UneCEUB, desenvolvido em React Native (Expo) com um Backend Customizado em Node.js e PostgreSQL.

## 🌟 Arquitetura do Projeto

O sistema utiliza uma arquitetura Full Stack com foco na segurança e na utilização do **CPF como identificador principal de login**.

| Componente | Tecnologia | Identificador de Login |
| :--- | :--- | :--- |
| **Front-end (App)** | React Native (Expo) | Captura CPF e Senha. |
| **Back-end (API)** | Node.js (Express) | **CPF** (ID primário), JWT, Hashing (`bcryptjs`). |
| **Banco de Dados** | PostgreSQL | Persistência de dados e autenticação segura. |

---

## 🛠️ 1. Configuração e Instalação

Para rodar o projeto, você precisa configurar os ambientes de Back-end (Node.js) e Front-end (React Native).

### 1.1. Configuração do Back-end (API)

Crie uma pasta separada para o backend (ex: `backend-api`) e instale as dependências:

```bash
# Na pasta backend-api
npm install express pg bcryptjs jsonwebtoken dotenv cors

Variáveis de Ambiente (backend-api/.env)
Crie o arquivo .env para a conexão com o PostgreSQL. Substitua os valores pelos seus dados reais.

# Configurações do PostgreSQL
DB_USER="postgres"
DB_HOST="localhost"
DB_NAME="UNECEUB"
DB_PASSWORD="sua_senha_do_banco"
DB_PORT=5432 

# Chave Secreta para Assinatura de Tokens JWT (MUITO SIGILO!)
JWT_SECRET="sua_chave_secreta_super_forte_e_aleatoria"

1.2. Configuração do Front-end (Raiz do Projeto)
Na pasta raiz do projeto (UNECEUB), instale a dependência de execução paralela e a biblioteca de armazenamento de sessão:

Bash

npm install concurrently @react-native-async-storage/async-storage

2. 💾 Banco de Dados (PostgreSQL Schema)
Execute o seguinte script SQL para criar a tabela users no seu banco de dados PostgreSQL.

SQL

-- Cria a tabela de usuários com CPF e Email únicos
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Otimiza a busca por CPF para o Login
CREATE INDEX idx_user_cpf ON users (cpf);

Com certeza! Aqui está o documento README.md completo, pronto para ser copiado e colado no seu repositório GitHub (dvieirath/UNECEUB).

Este arquivo documenta a arquitetura, o fluxo de autenticação e todas as configurações necessárias para rodar o projeto Full Stack.

README.md
Markdown

# 🚀 UNECEUB - Portal do Aluno (Mobile - React Native)

Este repositório contém o código do aplicativo móvel para o Portal do Aluno da UneCEUB, desenvolvido em React Native (Expo) com um Backend Customizado em Node.js e PostgreSQL.

## 🌟 Arquitetura do Projeto

O sistema utiliza uma arquitetura Full Stack com foco na segurança e na utilização do **CPF como identificador principal de login**.

| Componente | Tecnologia | Identificador de Login |
| :--- | :--- | :--- |
| **Front-end (App)** | React Native (Expo) | Captura CPF e Senha. |
| **Back-end (API)** | Node.js (Express) | **CPF** (ID primário), JWT, Hashing (`bcryptjs`). |
| **Banco de Dados** | PostgreSQL | Persistência de dados e autenticação segura. |

---

## 🛠️ 1. Configuração e Instalação

Para rodar o projeto, você precisa configurar os ambientes de Back-end (Node.js) e Front-end (React Native).

### 1.1. Configuração do Back-end (API)

Crie uma pasta separada para o backend (ex: `backend-api`) e instale as dependências:

```bash
# Na pasta backend-api
npm install express pg bcryptjs jsonwebtoken dotenv cors
Variáveis de Ambiente (backend-api/.env)
Crie o arquivo .env para a conexão com o PostgreSQL. Substitua os valores pelos seus dados reais.

# Configurações do PostgreSQL
DB_USER="postgres"
DB_HOST="localhost"
DB_NAME="UNECEUB"
DB_PASSWORD="sua_senha_do_banco"
DB_PORT=5432 

# Chave Secreta para Assinatura de Tokens JWT (MUITO SIGILO!)
JWT_SECRET="sua_chave_secreta_super_forte_e_aleatoria"
1.2. Configuração do Front-end (Raiz do Projeto)
Na pasta raiz do projeto (UNECEUB), instale a dependência de execução paralela e a biblioteca de armazenamento de sessão:

Bash

npm install concurrently @react-native-async-storage/async-storage
2. 💾 Banco de Dados (PostgreSQL Schema)
Execute o seguinte script SQL para criar a tabela users no seu banco de dados PostgreSQL.

SQL

-- Cria a tabela de usuários com CPF e Email únicos
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Otimiza a busca por CPF para o Login
CREATE INDEX idx_user_cpf ON users (cpf);
3. 🚀 Como Iniciar o Projeto (Full Stack)
O script dev inicia o servidor Node.js e o Expo em paralelo.

Execute na pasta raiz (UNECEUB):
Bash

npm run dev

4. 🔑 Fluxo de Autenticação Implementado
A. Cadastro (/api/register)
Validação: O Front-end valida CPF (11 dígitos), Email (formato), Senha (mín. 5 caracteres) e Idade (mín. 16 anos).

Comunicação: Os dados são enviados via POST para o Back-end.

Back-end: Criptografa a senha com bcryptjs, verifica unicidade de CPF/Email e insere no PostgreSQL.

Transição: Em caso de sucesso, o usuário recebe uma mensagem e é automaticamente transferido para a tela de Login em 2 segundos.

B. Login (/api/login)
Identificador: O usuário insere o CPF e a Senha.

Comunicação: Enviado via POST para http://[IP]:3000/api/login.

Back-end: Verifica se o CPF existe e compara a senha (bcrypt.compare).

Sessão: Em caso de sucesso, um Token JWT é retornado e armazenado no Front-end via AsyncStorage para manter a sessão ativa.
