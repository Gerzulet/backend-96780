// Ejemplo 2: Validación de variables requeridas
// ==============================================
// Buena práctica: Validar que las variables obligatorias existan

import 'dotenv/config'

function validateEnv() {
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
  const missing = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`)
  }
}

try {
  validateEnv()
  console.log('=== Ejemplo 2: Con validación ===')
  console.log('Todas las variables requeridas están presentes')
  console.log('DB_HOST:', process.env.DB_HOST)
  console.log('DB_USER:', process.env.DB_USER)
} catch (error) {
  console.error('Error:', error.message)
}
