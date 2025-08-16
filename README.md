# Node API com TypeScript e PostgreSQL

Uma API para geração e validação de tokens OTP, construída com arquitetura limpa, TypeScript e suporte tanto para execução local quanto em Docker.

## Funcionalidades

* Criar token OTP
* Validar token OTP
* Arquitetura Limpa
* Estrutura modular com TypeScript
* Conexão com PostgreSQL
* Suporte para execução local e em Docker

## Tecnologias

* Node.js + TypeScript
* Express
* PostgreSQL
* Docker
* Swagger

## Instalação

1. Clone o repositório:

   ```bash
   git clone <repo-url>
   cd <repo>
   ```

2. Instale dependências:

   ```bash
   npm install
   ```

3. Configure variáveis de ambiente:

   * Local: `.env.local`
   ```env
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=otp_db
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    NODE_ENV=local
    PORT=4000
   ```
   * Docker: `.env.docker`
   ```env
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=otp_db
    DATABASE_HOST=db
    DATABASE_PORT=5432
    NODE_ENV=docker
    PORT=4000
   ```

## Scripts

```bash
# Rodar localmente
npm run dev

# Rodar no Docker
docker-compose up --build
```
## Endpoints
| Método | Rota              | Descrição           |
| ------ | ----------------- | ------------------- |
| POST   | /api/otp          | Gera um token OTP   |
| POST   | /api/otp/validate | Valida um token OTP |
| GET   | /api-docs/ | Documentação da API |

Exemplo de request:
```
POST /api/otp
{
  "userId": "99"
}
```

Exemplo de response:
```
{
    "userId": "99",
    "token": "125833"
}
```
## Estrutura do Projeto
- src/application → Lógica de negócios, use cases e DTOs
- src/domain → entidade
- src/infra/http → Controllers e rotas
- src/infra/db → Repositórios e configuração do banco
- src/main → Ponto de entrada da aplicação
