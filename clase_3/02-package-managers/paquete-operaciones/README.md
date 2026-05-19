# coderhouse-clase3-operaciones

Paquete de ejemplo para la clase: operaciones aritméticas básicas publicables en **npm**.

## API

| Función | Descripción |
|---------|-------------|
| `sumar(a, b)` | Suma |
| `restar(a, b)` | Resta |
| `multiplicar(a, b)` | Producto |
| `dividir(a, b)` | División (error si `b === 0`) |
| `promedio(valores)` | Media de un arreglo de números |

```js
import { sumar, promedio } from "coderhouse-clase3-operaciones";

sumar(10, 5);        // 15
promedio([2, 4, 6]); // 4
```

## Antes de publicar

1. Revisar que el nombre `coderhouse-clase3-operaciones` esté libre en [npmjs.com](https://www.npmjs.com/) o cambiar `name` en `package.json`.
2. Completar `author` y `repository.url` si aplica.
3. Probar localmente:

```bash
npm test
```

## Publicar en npm (instructor)

```bash
cd paquete-operaciones
npm login
npm publish
```

Para paquetes con nombre público la primera vez suele bastar `npm publish --access public` si usás scope `@usuario/paquete`.

## Versionado

Tras cambios: `npm version patch` (o `minor` / `major`) y `npm publish` de nuevo.

## Consumir desde otro proyecto

La app [../app-consume-paquete](../app-consume-paquete) lo instala así:

```json
"coderhouse-clase3-operaciones": "^1.0.0"
```
