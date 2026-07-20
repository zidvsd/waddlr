// lib/db.ts
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL!

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined
}

const client =
  globalForDb.client ??
  postgres(connectionString, {
    prepare: false,
    max: 10, // cap pool size explicitly
  })

if (process.env.NODE_ENV !== "production") {
  globalForDb.client = client
}

export const db = drizzle(client, { schema })
