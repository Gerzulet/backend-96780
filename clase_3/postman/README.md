# Postman — Clase 3

## Importar

1. Abrí Postman.
2. **Import** → elegí `clase-3-apis.postman_collection.json`.
3. La colección trae variables (`baseUrl_logging`, `baseUrl_artillery`, etc.). Podés editarlas en la pestaña **Variables** de la colección.

## Servidores necesarios

| Carpeta en la colección | Puerto | Comando |
|-------------------------|--------|---------|
| 04 — Artillery | 3001 | `cd 04-artillery && npm run start:servidor` |
| 03 — Logging Winston | 3000 | `cd 03-logging-winston && npm run start:app` |
| 02 — App consume paquete | 3002 | `cd 02-package-managers/app-consume-paquete && npm start` |

No hace falta tener los tres levantados a la vez: probá la carpeta del bloque que estés dictando.

## Orden sugerido en clase

**Bloque Artillery:** carpeta `04` → mismo flujo que `escenarios/carga.yml` (health → ficha → listado → detalle → POST).

**Bloque Logging:** carpeta `03` en el orden de las requests (catálogo → inventario 409 → carrito → checkout → pedido).

**Bloque NPM:** carpeta `02` tras publicar/consumir el paquete.
