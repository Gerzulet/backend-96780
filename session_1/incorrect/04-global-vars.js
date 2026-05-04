// Ejemplo 4 (INCORRECTO): Modificar process.env y variables globales
// ==================================================================
// Mala práctica: Modificar process.env en tiempo de ejecución
// o usar variables globales en lugar de process.env

import 'dotenv/config'

console.log('=== Ejemplo INCORRECTO 4: Modificando process.env ===')

// ❌ Modificar process.env en tiempo de ejecución
process.env.MY_DYNAMIC_VAR = 'some value'
process.env.PORT = '9999'

console.log('Valor modificado:', process.env.MY_DYNAMIC_VAR)
console.log('PORT original sobrescrito:', process.env.PORT)
console.log('')
console.log('❌ Problemas:')
console.log('   1. process.env es para configuración, no para estado de la app')
console.log('   2. Modificar process.env puede causar efectos secundarios')
console.log('   3. No persiste entre reinicios')
console.log('')
console.log('✅ Usa variables normales para estado dinámico:')
console.log('   const myVar = getValue()')
