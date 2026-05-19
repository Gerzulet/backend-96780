// Ejemplo 2: Niveles de log con Winston
// ============================================================

import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

console.log("=== Winston — niveles (LOG_LEVEL=debug para ver debug) ===\n");
console.log("Nivel activo:", logger.level, "\n");

logger.error("Fallo crítico en pasarela de pago — requiere intervención");
logger.warn("Stock bajo en almacén principal — umbral al 15%");
logger.info("Pedido #4821 confirmado y enviado a fulfillment");
logger.http("GET /api/catalog/products 200 — línea típica de Morgan");
logger.debug("SQL: SELECT * FROM productos WHERE sku = $1 — solo en desarrollo");

console.log("\n→ En prod: level=info; en local: LOG_LEVEL=debug npm run demo:niveles");

//ERROR -> WARN -> INFO -> HTTP -> VERBOSE -> DEBUG
