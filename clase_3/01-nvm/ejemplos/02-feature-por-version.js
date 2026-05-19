// Ejemplo 2: Comportamiento según versión de Node
// ============================================================
// Misma API, distinto runtime — motivo de fijar versión en .nvmrc

const major = Number.parseInt(process.version.slice(1).split(".")[0], 10);

console.log("=== Features según versión de Node ===\n");
console.log("Node:", process.version, "| Major:", major);

// fetch global (estable desde Node 18+)
if (typeof globalThis.fetch === "function") {
  console.log("✓ fetch global disponible (Node 18+)");
} else {
  console.log("✗ fetch no disponible — actualizar Node");
}

// structuredClone (Node 17+)
try {
  const cloned = structuredClone({ a: 1, nested: { b: 2 } });
  console.log("✓ structuredClone:", cloned);
} catch {
  console.log("✗ structuredClone no disponible");
}

// import assertions / import attributes — solo mención según versión
if (major >= 20) {
  console.log("✓ Node 20+: buen candidato para proyectos actuales (LTS)");
}
if (major >= 22) {
  console.log("✓ Node 22: versión objetivo de este repositorio (.nvmrc)");
}

console.log("\n--- Caso de uso en equipo ---");
console.log(
  "CI y cada dev ejecutan `nvm use` → misma major → menos sorpresas en native addons y APIs."
);
