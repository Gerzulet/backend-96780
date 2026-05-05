// Ejemplo 2 (INCORRECTO): Secretos hardcodeados
// ==============================================
// Mala práctica: Escribir secretos directamente en el código

import 'dotenv/config'

// ❌ NUNCA hagas esto:
const apiKey = 'sk-1234567890abcdefghijklmnopqrstuvwxyz'
const dbPassword = 'mySuperSecretPassword123'
const jwtSecret = 'this-is-a-hardcoded-secret-key'

console.log('=== Ejemplo INCORRECTO 2: Secretos hardcodeados ===')
console.log('API Key:', apiKey)
console.log('DB Password:', dbPassword)
console.log('')
console.log('❌ Problemas:')
console.log('   1. El secreto se commitea al repositorio')
console.log('   2. No se puede cambiar sin modificar el código')
console.log('   3. Cualquiera con acceso al código ve los secretos')
console.log('')
console.log('✅ Debería ser:')
console.log('   const apiKey = process.env.API_KEY')
console.log('   const dbPassword = process.env.DB_PASSWORD')
