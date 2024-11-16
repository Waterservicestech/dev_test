import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  API_PORT: z.string().default("3000"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string().optional().default("3306"),
});

const envServer = envSchema.safeParse(process.env);

if (!envServer.success) {
  console.error(
    "There is an error with the server environment variables",
    envServer.error.issues,
  );
  process.exit(1);
}

export const envServerSchema = envServer.data;
