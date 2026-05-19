// Ejemplo 3: Transportes — consola + archivo
// ============================================================

import winston from "winston";
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDir = join(__dirname, "..", "logs");

if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: join(logsDir, "demo-transportes.log"),
    }),
  ],
});

console.log("=== Winston — transportes ===\n");
logger.info("Mensaje de negocio: mismo evento en consola y en archivo (demo transportes)");
logger.warn("En producción la rotación y el envío a ELK/Datadog lo define infraestructura");

console.log("\nArchivo:", join(logsDir, "demo-transportes.log"));
