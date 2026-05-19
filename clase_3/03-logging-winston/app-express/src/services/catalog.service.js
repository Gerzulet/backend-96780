import { logger } from "../config/logger.js";
import * as catalogRepo from "../repositories/catalog.repository.js";

export function listProducts() {
  const products = catalogRepo.findAll();
  logger.info(`Catálogo listado correctamente (${products.length} productos)`);
  return products;
}

export function getProduct(sku) {
  const product = catalogRepo.findBySku(sku);
  if (!product) {
    logger.warn(`Producto no encontrado en catálogo — SKU: ${sku}`);
    return null;
  }
  logger.info(
    `Detalle de producto — SKU: ${product.sku}, ${product.name}, stock: ${product.stock}, $${product.price}`
  );
  return product;
}

export function getInventory(sku) {
  const product = catalogRepo.findBySku(sku);
  if (!product) {
    logger.warn(`Inventario: SKU inexistente (${sku})`);
    return { status: "unknown_sku" };
  }
  if (product.stock === 0) {
    logger.warn(`Sin stock para venta — SKU: ${product.sku} (${product.name})`);
    return { status: "out_of_stock", sku: product.sku };
  }
  logger.debug(`Inventario OK — SKU: ${product.sku}, unidades: ${product.stock}`);
  return { status: "ok", sku: product.sku, stock: product.stock };
}

export function addCartItem({ sku, qty, cartId }) {
  if (!sku || !qty) {
    logger.warn(
      `Carrito: datos incompletos — SKU: ${sku ?? "—"}, cantidad: ${qty ?? "—"}, carrito: ${cartId ?? "—"}`
    );
    return { status: "invalid" };
  }
  const idCarrito = cartId ?? "sin-identificar";
  logger.info(`Producto agregado al carrito — SKU: ${sku}, cantidad: ${qty}, carrito: ${idCarrito}`);
  return {
    status: "ok",
    sku,
    qty,
    cartId: cartId ?? "cart-demo",
  };
}
