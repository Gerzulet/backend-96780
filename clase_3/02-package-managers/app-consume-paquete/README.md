# App que consume `coderhouse-clase3-operaciones` desde npm

## Requisito

El paquete debe estar publicado en npm con el nombre **`coderhouse-clase3-operaciones`** (ver [../paquete-operaciones/README.md](../paquete-operaciones/README.md)).

```bash
cd ../paquete-operaciones
npm login
npm publish
```

## Instalar y correr

```bash
cd app-consume-paquete
npm install
npm start
```

La dependencia en `package.json`:

```json
"coderhouse-clase3-operaciones": "^1.0.0"
```

`^1.0.0` permite versiones `1.x` compatibles (ej. `1.0.1`) sin pasar a `2.0.0`.

## Probar

```bash
curl "http://localhost:3002/api/calc?a=10&b=5"
curl -X POST http://localhost:3002/api/promedio \
  -H "Content-Type: application/json" \
  -d '{"valores":[2,4,6]}'
```

## Qué enseñar

- Publicar un paquete propio en el registry.
- Consumirlo como cualquier dependencia de npm (no `file:` local).
- El `package-lock.json` fija la versión exacta descargada.
