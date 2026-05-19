import { logger } from "../config/logger.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {{ cartId?: string, paymentMethod?: string }} input
 */
export async function processCheckout({ cartId, paymentMethod = "card" }) {
  if (!cartId) {
    logger.warn("Checkout rechazado: falta identificador de carrito");
    return { status: "missing_cart" };
  }

  const duracionSimuladaMs = 850 + Math.floor(Math.random() * 350);
  logger.info(
    `Inicio de checkout — carrito: ${cartId}, pago: ${paymentMethod}, estimado: ${duracionSimuladaMs} ms`
  );

  await delay(duracionSimuladaMs);

  const orderId = `ord-${Date.now()}`;
  logger.info(
    `Checkout completado — pedido: ${orderId}, carrito: ${cartId}, duración: ${duracionSimuladaMs} ms`
  );

  return { status: "ok", orderId, cartId, paymentStatus: "paid" };
}
