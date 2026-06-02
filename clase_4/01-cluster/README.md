# Cluster nativo — operación sencilla vs compleja


## Como usar

**Terminal 1** (servidor)

```bash
npm install
npm start                  # cluster usando con todos los CPUs
# npm run start:single     # una sola instancia (antes de cluster)
```

**Terminal 2** (Artillery)

```bash
npm install
npm run test:sencilla
npm run test:compleja
```

Comparar `npm run start:single` + `npm run test:compleja` vs `npm start` + `npm run test:compleja`.

## Endpoints 

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Saludo + `pid` + `worker` |
| GET | `/operacion-sencilla` | Respuesta inmediata |
| GET | `/operacion-compleja` | Fibonacci(40) síncrono — bloquea el worker |

