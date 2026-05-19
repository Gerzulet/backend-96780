import "./config/env.js";
import express from "express";
import morgan from "morgan";
import { logger } from "./config/logger.js";
import ecommerceController from "./controllers/ecommerce.controller.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan('dev'))

app.use(ecommerceController);

app.listen(port, () => {
  logger.info(
    `Servidor e-commerce iniciado en puerto ${port} — entorno: ${process.env.NODE_ENV || "development"}, nivel de log: ${logger.level}`
  );
  console.log(`
  E-commerce logging demo — http://localhost:${port}
  Morgan        → línea HTTP (nivel http en Winston)
  services/     → negocio (logger.info/warn con mensaje en español)
  repositories/ → debug de acceso a datos

  GET  /health
  GET  /api/catalog/products
  GET  /api/catalog/products/ZAP-001
  GET  /api/inventory/AUR-200          ← sin stock (409 + warn)
  POST /api/cart/items                 body: {"sku":"ZAP-001","qty":2}
  POST /api/checkout                   body: {"cartId":"c1"}  ← lento
  GET  /api/orders/ord-123
  POST /api/orders/ord-123/cancel      body: {"reason":"changed_mind"}
  GET  /api/admin/audit-legacy         ← console.log (mal ejemplo)

  Archivo: logs/app.log
  `);
});
