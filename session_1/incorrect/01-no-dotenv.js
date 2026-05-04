// Ejemplo 1 (INCORRECTO): No cargar dotenv
// ==========================================
// Mala práctica: Asumir que las variables de entorno están disponibles
// sin cargar dotenv primero

// ❌ Olvidamos import 'dotenv/config'

console.log('=== Ejemplo INCORRECTO 1: Sin dotenv ===')
console.log('PORT:', process.env.PORT)
console.log('DB_HOST:', process.env.DB_HOST)
console.log('')
console.log('❌ Problema: Las variables de .env no estarán disponibles')
console.log('   porque no se cargó dotenv')
