// Ejemplo 3 (INCORRECTO): Sin validación de variables
// ===================================================
// Mala práctica: Usar variables de entorno sin verificar si existen

import 'dotenv/config'

console.log('=== Ejemplo INCORRECTO 3: Sin validación ===')

// ❌ Usar variables sin verificar si están definidas
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

console.log('Configuración de BD:', dbConfig)
console.log('')
console.log('❌ Problemas:')
console.log('   1. Si falta DB_HOST, será undefined y puede causar errores')
console.log('   2. No hay feedback claro sobre qué variable falta')
console.log('   3. El error aparecerá más tarde al conectar a la BD')
console.log('')
console.log('✅ Debería validarse antes de usar')
