// Ejemplo 4: Conversión de tipos
// ===============================
// Buena práctica: Convertir strings a los tipos correctos según necesidad

import 'dotenv/config'

function getNumberEnv(key, defaultValue) {
  // la sintaxis process.env[key] nos permite seleccionar la variable de entorno por su nombre
  const value = process.env[key]
  if (value === undefined) return defaultValue
  const parsed = Number(value)
  return isNaN(parsed) ? defaultValue : parsed
}

function getBooleanEnv(key, defaultValue) {
  const value = process.env[key]
  if (value === undefined) return defaultValue
  return value.toLowerCase() === 'true'
}

console.log('=== Ejemplo 4: Conversión de tipos ===')
console.log('PORT (number):', getNumberEnv('PORT', 3000))
console.log('DB_PORT (number):', getNumberEnv('DB_PORT', 5432))
console.log('DEBUG (boolean):', getBooleanEnv('DEBUG', false))
console.log('Tipos - PORT:', typeof getNumberEnv('PORT', 3000))
