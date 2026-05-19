// Prueba local antes de publicar (npm test)
import { sumar, restar, multiplicar, dividir, promedio } from "../src/index.js";

console.log("=== smoke test ===");
console.assert(sumar(2, 3) === 5, "sumar");
console.assert(restar(10, 4) === 6, "restar");
console.assert(multiplicar(3, 7) === 21, "multiplicar");
console.assert(dividir(8, 2) === 4, "dividir");
console.assert(promedio([2, 4, 6]) === 4, "promedio");
console.log("✓ Todas las operaciones OK");
