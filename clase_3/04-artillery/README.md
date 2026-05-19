# Artillery — preguntas de producto (e-commerce)

Simula usuarios que consultan la ficha de un producto y la **sección de preguntas y respuestas** (leer listado, ver un hilo, publicar una pregunta).

Servidor Express en **:3001** + escenario `escenarios/carga.yml`.

## Uso

**Terminal 1** (servidor + Morgan)

```bash
npm install
npm run start:servidor   # instala deps del servidor si faltan (incl. morgan)
# Verás líneas tipo: GET /api/productos/.../preguntas 200 1.234 ms - 312
```

**Terminal 2** (Artillery)

```bash
npm run test
npm run test:json
npm run report:html
npm run test:reporte   # JSON + HTML → abrir reportes/ultimo.html
```

## API de demo

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos/zapatilla-running-pro` | Ficha del producto |
| GET | `/api/productos/.../preguntas` | Listado de Q&A |
| GET | `/api/productos/.../preguntas/preg-1` | Una pregunta |
| POST | `/api/productos/.../preguntas` | Nueva pregunta (`autor`, `texto`) |

## Escenario de carga

Archivo comentado: `escenarios/carga.yml`.

| Sección | Rol |
|---------|-----|
| `config.target` | Host base; las `url` del flow son rutas relativas |
| `config.phases` | Cuántos usuarios/s y por cuánto tiempo (en secuencia) |
| `config.plugins` | Extensiones (aquí: métricas por endpoint) |
| `scenarios[].flow` | Pasos de cada usuario virtual: `get`, `post`, `think` |

Flujo: health → producto → listado → `think` 1 s → detalle → POST pregunta.

Fases: warm-up (2 usuarios/s, 10 s) → carga sostenida (5 usuarios/s, 20 s).

## Métricas por endpoint (`metrics-by-endpoint`)

Plugin: `artillery-plugin-metrics-by-endpoint` (declarado en `package.json`).

En `escenarios/carga.yml`:

```yaml
config:
  plugins:
    metrics-by-endpoint:
      useOnlyRequestNames: true
```

Cada paso del flujo tiene `name:` (ej. `Listar preguntas`, `Publicar pregunta`) para agrupar latencia y códigos HTTP **por acción**, no solo el total.

En la consola y en `reportes/ultimo.json` buscá claves como:

- `plugins.metrics-by-endpoint.Listar preguntas.codes.200`
- `plugins.metrics-by-endpoint.Publicar pregunta.response_time.p95`

Útil para comparar, por ejemplo, lectura (GET) vs escritura (POST).
