// Ejemplo 1: Versión de Node en uso
// ============================================================
// Ejecutar después de `nvm use` en esta carpeta (lee .nvmrc)

console.log("=== Versión de Node en ejecución ===\n");
console.log("process.version:", process.version);
console.log("process.release:", process.release.name, process.release.lts || "(no LTS)");
console.log("\n--- process.versions (selección) ---");
console.log("node:", process.versions.node);
console.log("v8:", process.versions.v8);
console.log("openssl:", process.versions.openssl);

const major = Number.parseInt(process.version.slice(1).split(".")[0], 10);
console.log("\nMajor version:", major);
console.log(
  major >= 22
    ? "✓ Estás en Node 22+ (alineado con .nvmrc de este proyecto)"
    : major >= 18
      ? "⚠ Node 18–21: revisa si coincide con lo que pide el equipo"
      : "✗ Node muy antiguo para este curso"
);
