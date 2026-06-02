import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/clase4";

export async function connectDb(retries = 15, delayMs = 2000) {
  mongoose.set("strictQuery", true);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGO_URL);
      console.log(`Mongo conectado: ${MONGO_URL}`);
      return;
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(
        `Mongo no disponible (intento ${attempt}/${retries}). Reintento en ${delayMs}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

export async function pingDb() {
  await mongoose.connection.db.admin().ping();
  return { ok: true, host: mongoose.connection.host, db: mongoose.connection.name };
}
