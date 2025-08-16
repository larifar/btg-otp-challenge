import { Pool } from "pg";
import dotenv from "dotenv";

const isDocker = process.env.NODE_ENV === "docker";


dotenv.config({
  path: isDocker ? ".env.docker" : ".env.local"
});

const database = new Pool({
  user: process.env.DATABASE_USER ?? "postgres",
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME ?? "otp_db",
  password: process.env.DATABASE_PASSWORD ?? "postgres",
  port: Number(process.env.DATABASE_PORT) || 5432,
});

const SQL_USER_AUTH_CREATE = `
CREATE TABLE IF NOT EXISTS user_auth (
    id TEXT PRIMARY KEY,
    seed TEXT NOT NULL
)`;

database.query(SQL_USER_AUTH_CREATE)
  .then(() => {
    console.log("Tabela criada com sucesso.");
  })
  .catch((err) => {
    console.error("Erro ao criar tabela:", err);
    throw err;
  });

console.log("Base de dados conectada com sucesso.");

export default database;