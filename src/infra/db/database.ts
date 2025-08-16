import { Pool } from "pg";

const database = new Pool({
  user: "postgres",
  host: "localhost",
  database: "otp_db",
  password: "postgres",
  port: 5432,
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