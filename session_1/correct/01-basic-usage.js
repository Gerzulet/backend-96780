// Ejemplo 1: Uso básico y correcto de variables de entorno
// ==========================================================
// Buena práctica: Cargar dotenv al inicio y acceder vía process.env

import 'dotenv/config'

const port = process.env.PORT
const dbHost = process.env.DB_HOST
const nodeEnv = process.env.NODE_ENV

console.log('=== Ejemplo 1: Uso básico ===')
console.log('PORT:', port)
console.log('DB_HOST:', dbHost)
console.log('NODE_ENV:', nodeEnv)
console.log('')

// Las variables de entorno siempre son strings
console.log('Tipo de PORT:', typeof port)
