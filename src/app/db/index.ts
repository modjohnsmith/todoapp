import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon("postgresql://neondb_owner:npg_4bnwEKAzcPI3@ep-quiet-flower-a82czq76-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql);
