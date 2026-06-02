import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/clase4";

export async function connectDb() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URL);
  console.log(`Mongo conectado: ${MONGO_URL}`);
}

export async function pingDb() {
  await mongoose.connection.db.admin().ping(); // solo para verificar que la conexion esta activa
  return { ok: true, host: mongoose.connection.host };
}
