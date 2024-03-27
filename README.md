# API de Autenticação com JWT

Esta é uma API de autenticação que permite que os usuários se cadastrem, façam login e verifiquem a autenticação usando tokens JWT.

## Endpoints

### Cadastro de Usuário

- **URL:** `/api/signUp`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "email": "usuario@example.com",
    "senha": "senha123"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "mensagem": "Usuário registrado com sucesso"
  }
  ```
- **Resposta de Erro:**
  ```json
  {
    "erro": "Ocorreu um erro ao registrar o usuário"
  }
  ```

### Login de Usuário

- **URL:** `/api/signIn`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "email": "usuario@example.com",
    "senha": "senha123"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "access_token": "token_jwt"
  }
  ```
- **Resposta de Erro:**
  ```json
  {
    "erro": "Credenciais inválidas"
  }
  ```

### Verificação de Token JWT

- **URL:** `/api/privateRoute`
- **Método:** `GET`
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer token_jwt
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "mensagem": "Token JWT válido. Você está autenticado."
  }
  ```
- **Resposta de Erro:**
  ```json
  {
    "erro": "Token JWT inválido ou ausente. Faça login para acessar esta rota."
  }
  ```

## Como Usar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

3. Use os endpoints conforme documentado acima.

## Bibliotecas Utilizadas

- Express.js: Para criação do servidor web.
- crypto-js: Para criptografia de senhas.
- jsonwebtoken (JWT): Para geração e verificação de tokens JWT.
- sqlite3: Para o armazenamento.
