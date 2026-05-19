// App que consume el paquete publicable (local o desde npm)
// ============================================================

import express from "express";
import {
  sumar,
  restar,
  multiplicar,
  dividir,
  promedio,
} from "coderhouse-clase-operaciones";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", paquete: "coderhouse-clase3-operaciones" });
});

/** GET /api/calc?a=10&b=5 — usa el paquete publicado */
app.get("/api/calc", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "Query a y b deben ser números" });
  }

  try {
    res.json({
      a,
      b,
      suma: sumar(a, b),
      resta: restar(a, b),
      producto: multiplicar(a, b),
      cociente: dividir(a, b),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/** POST /api/promedio  body: { "valores": [1, 2, 3] } */
app.post("/api/promedio", (req, res) => {
  const { valores } = req.body ?? {};

  try {
    res.json({ valores, promedio: promedio(valores) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`\nApp consume-paquete → http://localhost:${port}`);
  console.log(`  GET  /health`);
  console.log(`  GET  /api/calc?a=10&b=5`);
  console.log(`  POST /api/promedio  { "valores": [2, 4, 6] }\n`);
});
