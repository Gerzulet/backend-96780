import winston from "winston";
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { isProd, logLevel } from "./env.js";

// Ruta del archivo actual (necesaria en ESM para armar paths relativos)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Carpeta donde se guardan los logs en disco (gitignore: logs/)
const logsDir = join(__dirname, "..", "..", "logs");

if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

/**
 * Nivel mínimo que se registra (de más grave a más verboso):
 * error → warn → info → http → verbose → debug
 *
 * Definido en env.js (lee .env antes de crear el logger).
 */
const level = logLevel;

export const logger = winston.createLogger({
  // Solo se emiten logs de este nivel o más graves (ver jerarquía arriba)
  level,

  // Cómo se transforma cada log antes de enviarlo a los transports (solo mensaje + timestamp)
  format: winston.format.combine(
    // Agrega marca de tiempo ISO (ej. 2026-05-18T20:00:00.000Z)
    winston.format.timestamp(),

    // Si logueás un Error, incluye el stack trace
    winston.format.errors({ stack: true }),

    // Prod: una línea JSON por evento (fácil de parsear en herramientas)
    // Dev: timestamp + nivel coloreado + mensaje en la consola
    isProd
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(), // colorea el nivel (info=verde, warn=amarillo, etc.)
          winston.format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`
          )
        )
  ),

  // Destinos del log (puede haber varios a la vez)
  transports: [
    // Consola del proceso Node (terminal donde corre npm run start:app)
    new winston.transports.Console(),

    // Archivo persistente — siempre en JSON aunque la consola use formato legible
    new winston.transports.File({
      filename: join(logsDir, "app.log"),
      format: winston.format.json(), // override: el archivo no hereda el printf de dev
      level: logLevel,
    }),
  ],
});
