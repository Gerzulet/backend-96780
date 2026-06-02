import express from "express";
import sharp from "sharp";
import { connectDb, pingDb } from "./db.js";
import { User } from "./models/user.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SKU_DEMO = "zapatilla-running-pro";

app.use(express.json());

const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

app.get("/", (_req, res) => {
  res.json({
    mensaje: "Hola desde Docker",
    servicio: "kubeusers",
    pid: process.pid,
    sku: SKU_DEMO,
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
  const resultado = fibonacci(40);
  res.json({ operacion: "compleja", resultado, pid: process.pid });
});

app.get("/producto-qr", async (_req, res) => {
  const svg = `
    <svg width="280" height="280" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="20" y="20" width="240" height="240" fill="#111827"/>
      <rect x="40" y="40" width="200" height="200" fill="#ffffff"/>
      <text x="50%" y="48%" text-anchor="middle" font-size="14" font-family="monospace" fill="#111827">${SKU_DEMO}</text>
      <text x="50%" y="58%" text-anchor="middle" font-size="11" font-family="monospace" fill="#374151">kubeusers</text>
    </svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  res.type("png").send(png);
});

app.get("/health/db", async (_req, res) => {
  try {
    const ping = await pingDb();
    res.json(ping);
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

app.get("/api/users", async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json({ total: users.length, users });
});

app.post("/api/users", async (req, res) => {
  const { name, role } = req.body ?? {};

  if (!name?.trim()) {
    return res.status(400).json({ error: "name es requerido" });
  }

  const user = await User.create({
    name: name.trim(),
    role: role === "admin" ? "admin" : "user",
  });

  res.status(201).json({ user });
});

await connectDb();

app.listen(PORT, () => {
  console.log(`kubeusers en http://localhost:${PORT} (pid ${process.pid})`);
});
