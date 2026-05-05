// Ejemplo 3: Uso de valores por defecto
// ========================================
// Buena práctica: Proporcionar valores por defecto para variables opcionales

import 'dotenv/config'

function getEnv(key, defaultValue) {
  return process.env[key] !== undefined ? process.env[key] : defaultValue
}

console.log('=== Ejemplo 3: Con valores por defecto ===')
console.log('PORT:', getEnv('PORT', '3000'))
console.log('HOST:', getEnv('HOST', 'localhost'))
console.log('TIMEOUT:', getEnv('TIMEOUT', '5000'))
console.log('DEBUG:', getEnv('DEBUG', 'false'))
