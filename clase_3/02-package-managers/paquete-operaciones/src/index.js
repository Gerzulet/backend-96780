// coderhouse-clase3-operaciones
// ============================================================
// Operaciones aritméticas básicas para demo de publicación en npm

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function sumar(a, b) {
  return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function restar(a, b) {
  return a - b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function multiplicar(a, b) {
  return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function dividir(a, b) {
  if (b === 0) {
    throw new Error("dividir: el divisor no puede ser cero");
  }
  return a / b;
}

/**
 * @param {number[]} valores
 * @returns {number}
 */
export function promedio(valores) {
  if (!Array.isArray(valores) || valores.length === 0) {
    throw new Error("promedio: se requiere un arreglo con al menos un número");
  }
  const total = valores.reduce((acc, n) => acc + n, 0);
  return total / valores.length;
}
