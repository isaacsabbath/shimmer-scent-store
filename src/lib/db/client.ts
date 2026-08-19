import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// This file only ever runs on the server (imported from server functions /
// route loaders' server-only code), so it's safe to read process.env and
// hold a live Postgres connection pool here.
declare global {
  var __mlwPgPool: Pool | undefined;
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your Postgres instance.",
    );
  }

  // Reuse the pool across hot-reloads / server function invocations instead
  // of opening a new connection pool on every request.
  if (!global.__mlwPgPool) {
    global.__mlwPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    });
  }
  return global.__mlwPgPool;
}

export const db = drizzle(getPool(), { schema });
