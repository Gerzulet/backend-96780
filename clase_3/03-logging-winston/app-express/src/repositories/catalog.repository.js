import { logger } from "../config/logger.js";
import { products } from "../data/catalog.js";

export function findAll() {
  logger.debug("Consulta: listar todos los productos del catálogo");
  return [...products];
}

export function findBySku(sku) {
  const inicio = performance.now();
  logger.debug(`Consulta: buscar producto por SKU (${sku})`);

  const product = products.find((p) => p.sku === sku) ?? null;
  const duracionMs = Math.round(performance.now() - inicio);

  logger.debug(
    `Consulta por SKU finalizada — SKU: ${sku}, encontrado: ${product ? "sí" : "no"}, ${duracionMs} ms`
  );

  return product;
}
