import cluster from "node:cluster";
import os from "node:os";
import express from "express";

const ETAPA = process.env.ETAPA || "workers";
const PORT = Number(process.env.PORT) || 3002;

const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

if (ETAPA !== "single" && cluster.isPrimary) {
  const numWorkers =  os.cpus().length;

  console.log(`Primary pid ${process.pid} | etapa: ${ETAPA} | workers: ${numWorkers}`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
} else {
  if (ETAPA === "single") {
    console.log(`Modo single-process (sin cluster) — pid ${process.pid}`);
  }







  const app = express();

  app.get("/", (_req, res) => {
    res.json({
      mensaje: "Servidor activo",
      pid: process.pid,
      etapa: ETAPA,
      worker: cluster.isWorker ? cluster.worker.id : null,
    });
  });

  app.get("/operacion-sencilla", (_req, res) => {
    res.json({
      operacion: "sencilla",
      pid: process.pid,
      timestamp: Date.now(),
    });
  });

  app.get("/operacion-compleja", (_req, res) => {
    console.log(`[pid ${process.pid}] operacion-compleja iniciada`);
    const resultado = fibonacci(40);
    console.log(`[pid ${process.pid}] operacion-compleja finalizada`);
    res.json({ operacion: "compleja", resultado, pid: process.pid });
  });

  app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT} (pid ${process.pid})`);
  });
}
