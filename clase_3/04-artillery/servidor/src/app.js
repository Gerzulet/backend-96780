import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));

const PRODUCTO_DEMO = {
  sku: "zapatilla-running-pro",
  nombre: "Zapatilla Running Pro",
  precio: 129_990,
  categoria: "calzado",
};

/** @type {Map<string, Array<{ id: string, autor: string, texto: string, respuestas: Array<{ autor: string, texto: string }> }>>} */
const preguntasPorSku = new Map([
  [
    PRODUCTO_DEMO.sku,
    [
      {
        id: "preg-1",
        autor: "María",
        texto: "¿Viene en talle 42?",
        respuestas: [
          { autor: "Tienda Oficial", texto: "Sí, hay stock en 42 y 43." },
        ],
      },
      {
        id: "preg-2",
        autor: "Juan",
        texto: "¿Sirve para trail o solo asfalto?",
        respuestas: [],
      },
    ],
  ],
]);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", servicio: "preguntas-producto" });
});

/** Ficha del producto (contexto antes de ver preguntas) */
app.get("/api/productos/:sku", (req, res) => {
  const { sku } = req.params;
  if (sku !== PRODUCTO_DEMO.sku) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(PRODUCTO_DEMO);
});

/** Listado de preguntas y respuestas del producto */
app.get("/api/productos/:sku/preguntas", (req, res) => {
  const { sku } = req.params;
  const preguntas = preguntasPorSku.get(sku);
  if (!preguntas) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json({ sku, total: preguntas.length, preguntas });
});

/** Detalle de una pregunta */
app.get("/api/productos/:sku/preguntas/:id", (req, res) => {
  const { sku, id } = req.params;
  const preguntas = preguntasPorSku.get(sku);
  if (!preguntas) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  const pregunta = preguntas.find((p) => p.id === id);
  if (!pregunta) {
    return res.status(404).json({ error: "Pregunta no encontrada" });
  }
  res.json({ sku, pregunta });
});

/** Usuario publica una nueva pregunta sobre el producto */
app.post("/api/productos/:sku/preguntas", (req, res) => {
  const { sku } = req.params;
  const { autor, texto } = req.body ?? {};

  if (!preguntasPorSku.has(sku)) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  if (!autor?.trim() || !texto?.trim()) {
    return res.status(400).json({ error: "autor y texto son requeridos" });
  }

  const pregunta = {
    id: `preg-${Date.now()}`,
    autor: autor.trim(),
    texto: texto.trim(),
    respuestas: [],
  };

  preguntasPorSku.get(sku).push(pregunta);
  res.status(201).json({ sku, pregunta });
});

app.listen(port, () => {
  console.log(`\nE-commerce — sección de preguntas`);
  console.log(`Morgan (dev) → una línea por request en esta terminal`);
  console.log(`Artillery target: http://localhost:${port}\n`);
  console.log(`  Producto demo: ${PRODUCTO_DEMO.sku}`);
  console.log("  GET  /health");
  console.log(`  GET  /api/productos/${PRODUCTO_DEMO.sku}`);
  console.log(`  GET  /api/productos/${PRODUCTO_DEMO.sku}/preguntas`);
  console.log(`  GET  /api/productos/${PRODUCTO_DEMO.sku}/preguntas/:id`);
  console.log(`  POST /api/productos/${PRODUCTO_DEMO.sku}/preguntas`);
});
