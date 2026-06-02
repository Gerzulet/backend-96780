# Docker — app + MongoDB con persistencia

Empaqueta el servidor de operaciones y lo conecta a **MongoDB** en otro contenedor, con volumen persistente. Puente hacia el bloque Kubernetes.

## Stack

```
docker compose
├── mongo:7          → volumen clase4-mongo-data en /data/db
└── app (Node)       → MONGO_URL=mongodb://mongo:27017/clase4
```

## Inicio rápido (recomendado)

```bash
npm install
npm run docker:up
```

App en **:3000**, Mongo en **:27017**. Primera vez construye la imagen.

```bash
curl http://localhost:3000/health/db
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","role":"admin"}'
curl http://localhost:3000/api/users
```

Detener:

```bash
npm run docker:down
```

Borrar contenedores **y** el volumen (pierde datos de Mongo)

```bash
npm run docker:down:volumes
```

## App local (sin Compose)

Requiere Mongo en el host:

```bash
docker run -d --name mongo-local -p 27017:27017 \
  -v clase4-mongo-data:/data/db mongo:7

cp .env.example .env   # opcional
npm install
npm start
```


| Método | Ruta                  | Descripción             |
| ------ | --------------------- | ----------------------- |
| GET    | `/`                   | Saludo + pid            |
| GET    | `/operacion-sencilla` | Respuesta inmediata     |
| GET    | `/operacion-compleja` | Fibonacci(40) síncrono  |
| GET    | `/producto-qr`        | PNG (`sharp` + libvips) |
| GET    | `/health/db`          | Ping a Mongo            |
| GET    | `/api/users`          | Listar usuarios         |
| POST   | `/api/users`          | Crear `{ name, role }`  |




Comandos detallados: `[COMANDOS.md](COMANDOS.md)`.

## DockerHub

Opcional: tag + push de la imagen de la app
