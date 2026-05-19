
console.log("=== Problemas típicos de console.log ===\n");

console.log("Cliente registrado", { id: 1 });
console.log("ERROR: pasarela de pago caída");
// console.log("debug interno:", process.env);

console.log("request", "POST", "/api/checkout", 201, "940ms");

function procesarCheckout() {
  console.log("procesando pago");
}

procesarCheckout();

console.log("\n→ En producción: Winston con niveles, JSON, transportes y datos de negocio en español.");
