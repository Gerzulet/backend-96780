# Node.js Environment Variables - Ejemplos Docentes

Ejemplos para enseñar el uso de variables de entorno en Node.js con `dotenv` y `process.env`.

## Estructura

```
session_1/
├── correct/          # 4 ejemplos de uso CORRECTO
│   ├── 01-basic-usage.js
│   ├── 02-with-validation.js
│   ├── 03-with-defaults.js
│   └── 04-type-conversion.js
├── incorrect/        # 4 ejemplos de uso INCORRECTO
│   ├── 01-no-dotenv.js
│   ├── 02-hardcoded-secrets.js
│   ├── 03-no-validation.js
│   └── 04-global-vars.js
├── .env.example      # Template de variables
├── .gitignore        # Evita commitear secretos
└── package.json
```

## Configuración inicial

```bash
# Copiar el archivo de ejemplo y configurar tus valores
cp .env.example .env
```

## Ejecutar ejemplos

### Ejemplos CORRECTOS ✅

```bash
npm run example:correct:basic        # 1. Uso básico
npm run example:correct:validation   # 2. Con validación
npm run example:correct:defaults     # 3. Con valores por defecto
npm run example:correct:types        # 4. Conversión de tipos
```

### Ejemplos INCORRECTOS ❌

```bash
npm run example:incorrect:nodotenv      # 1. Sin cargar dotenv
npm run example:incorrect:hardcoded    # 2. Secretos hardcodeados
npm run example:incorrect:novalidation  # 3. Sin validación
npm run example:incorrect:global       # 4. Modificando process.env
```

## Aplicación Express Completa

Una aplicación Express.js que demuestra el uso práctico de variables de entorno:

```bash
npm start          # Inicia el servidor Express
```

Endpoints disponibles:
- `GET /` - Información de la API
- `GET /health` - Health check
- `GET /config` - Configuración (sin exponer secretos)
- `GET /db-status` - Estado de la BD
- `GET /api-info` - Estado de API keys

## Conceptos clave

| Concepto | Explicación |
|----------|-------------|
| `process.env` | Objeto global que contiene las variables de entorno |
| `dotenv` | Carga variables desde archivo `.env` a `process.env` |
| `.env` | Archivo local con pares clave=valor (NO commitear) |
| Valores por defecto | Usar fallback cuando la variable no existe |
| Validación | Verificar variables requeridas antes de usarlas |
