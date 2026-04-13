import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "Complejo95@",
  host: "localhost",
  port: 5432,
  database: "myshop",
});
