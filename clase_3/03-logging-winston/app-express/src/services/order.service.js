import { logger } from "../config/logger.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOTIVOS_CANCELACION = {
  customer_request: "solicitud del cliente",
  fraud_suspected: "sospecha de fraude",
  out_of_stock: "falta de stock al despachar",
};

export async function getOrder(orderId) {
  logger.info(`Consulta de pedido — ID: ${orderId}`);
  await delay(80 + Math.floor(Math.random() * 40));
  logger.debug(`Pedido ${orderId} encontrado — estado: enviado`);
  return {
    orderId,
    status: "shipped",
    items: [{ sku: "ZAP-001", qty: 1 }],
  };
}

export function cancelOrder(orderId, reason = "customer_request") {
  const descripcion = MOTIVOS_CANCELACION[reason] ?? reason;
  logger.warn(`Pedido cancelado — ID: ${orderId}, motivo: ${descripcion}`);
  return { orderId, status: "cancelled", reason };
}
