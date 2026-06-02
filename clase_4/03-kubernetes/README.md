# Kubernetes — orquestación con Minikube

Despliega **kubeusers** (3 réplicas) + **MongoDB** con persistencia en un cluster local.

## App local (sin K8s)

Requiere Mongo en `:27017`:

```bash
docker run -d --name mongo-local -p 27017:27017 mongo:7
npm install
npm start    # MONGO_URL por defecto: mongodb://127.0.0.1:27017/clase4
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Saludo + servicio kubeusers |
| GET | `/operacion-sencilla` | Respuesta inmediata |
| GET | `/operacion-compleja` | Fibonacci(40) |
| GET | `/producto-qr` | PNG (sharp + libvips) |
| GET | `/health/db` | Ping a Mongo |
| GET | `/api/users` | Listar usuarios |
| POST | `/api/users` | Crear `{ name, role }` |

## Manifiestos

- [`k8s/mongo.yaml`](k8s/mongo.yaml) — PVC + Deployment + Service ClusterIP
- [`k8s/kubeusers.yaml`](k8s/kubeusers.yaml) — Deployment (3 réplicas) + Service LoadBalancer

### mongo.yaml

1. **PersistentVolumeClaim** `mongo-pvc` — almacenamiento que sobrevive al pod
2. **Deployment** `mongo` — monta el PVC en `/data/db`
3. **Service** `mongo` — DNS interno `mongodb://mongo:27017/clase4`

### kubeusers.yaml

1. **Deployment** `kubeusers` — 3 pods, `MONGO_URL`, imagen local `kubeusers:local`
2. **resources** — `requests` (reserva mínima) y `limits` (tope de CPU/RAM por contenedor)
3. **Service** `kubeservice` — LoadBalancer, puerto 80 → 3000

`mongo.yaml` también define `requests` y `limits` para el contenedor de Mongo.

## Recursos (npm)

Con el cluster desplegado (`kubectl apply`):

```bash
npm run k8s:resources
```

Tras cambiar `resources` en los YAML: `kubectl apply -f k8s/...` de nuevo.

## Flujo completo

Ver [`COMANDOS.md`](COMANDOS.md). Resumen:

```bash
minikube start
eval "$(minikube -p minikube docker-env --shell bash)"
docker build -t kubeusers:local .
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/kubeusers.yaml
minikube service kubeservice --url
```

## Docker ↔ Kubernetes (persistencia)

| Docker | Kubernetes |
|--------|------------|
| `docker volume create` | `PersistentVolumeClaim` |
| `-v nombre:/data/db` | `volumeMounts` + `volumes` |
| `docker volume inspect` | `kubectl describe pvc mongo-pvc` |

Sin PVC, reiniciar el pod de Mongo borraría los datos — mismo concepto que el bloque Docker.

## Dockerfile

Multistage (`node:22` builder + `node:22-alpine` runtime) para que `sharp` compile bien al hacer `docker build` dentro de Minikube. No hace falta Docker Desktop en el host si Minikube ya está corriendo.
