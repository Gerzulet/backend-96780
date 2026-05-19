// Cargar .env ANTES que logger.js lea process.env (los imports de ESM se resuelven primero)
import dotenv from "dotenv";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env en la raíz de 03-logging-winston (desde app-express/src/config → ../../../.env)
dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });

export const isProd = process.env.NODE_ENV === "production";

/**
 * Por defecto: debug en dev, info en prod.
 * Nota: Morgan usa logger.http — con level "info" no verás líneas HTTP.
 *       Usá LOG_LEVEL=http en prod si querés access logs de Morgan.
 */
export const logLevel = process.env.LOG_LEVEL || (isProd ? "info" : "debug");
