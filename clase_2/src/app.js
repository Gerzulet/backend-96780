import express from "express";
import morgan from "morgan";
import { config } from "./config/env.js";

// --- Middlewares globales ---
// import { requestLogger } from "./middlewares/requestLogger.js";
import { compressionMiddleware } from "./middlewares/compression.js";

// --- Controladores ---
import responsesController from "./controllers/responses.controller.js";
import errorsController from "./controllers/errors.controller.js";
import compressionController from "./controllers/compression.controller.js";
import cacheController from "./controllers/cache.controller.js";
import ordersController from "./controllers/orders.controller.js";

// --- Middleware de errores (debe ir al final) ---
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// ============================================================
// MIDDLEWARES GLOBALES
// ============================================================

// 1. Compresión HTTP (se aplica globalmente)
app.use(compressionMiddleware);

// 2. Parse JSON body
app.use(express.json());

// 3. Request Logger (morgan - librería estándar)
// Formatos: combined, common, dev, short, tiny
// "dev" muestra método, url, status coloreado, tiempo de respuesta
app.use(morgan("dev"));

// Alternativa: Logger custom (descomentar para usar en vez de morgan)
// app.use(requestLogger);

// 4. Servir frontend estático
app.use(express.static("frontend"));

// ============================================================
// RUTAS
// ============================================================

app.use("/api/responses", responsesController);
app.use("/api/errors", errorsController);
app.use("/api/compression", compressionController);
app.use("/api/cache", cacheController);
app.use("/api/orders", ordersController);

// ============================================================
// MIDDLEWARE DE MANEJO DE ERRORES (siempre al final)
// ============================================================
app.use(errorHandler);

// ============================================================
// INICIAR SERVIDOR
// ============================================================
app.listen(config.port, () => {
  console.log(`\n Servidor corriendo en http://localhost:${config.port}`);
  console.log(` Entorno: ${config.env}`);
  console.log(`\n Endpoints disponibles:`);
  console.log(`  - Responses:   http://localhost:${config.port}/api/responses`);
  console.log(`  - Errors:      http://localhost:${config.port}/api/errors`);
  console.log(`  - Compression: http://localhost:${config.port}/api/compression`);
  console.log(`  - Cache:       http://localhost:${config.port}/api/cache`);
  console.log(`  - Orders:      http://localhost:${config.port}/api/orders (para analizar)`);
  console.log(`\n  Frontend:      http://localhost:${config.port}/index.html`);
});
