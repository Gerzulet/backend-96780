// Controller: HTTP solamente — extrae datos del request y delega a services
// Los logs de negocio viven en services/repositories (logger.child por módulo)
// ============================================================

import { Router } from "express";
import * as catalogService from "../services/catalog.service.js";
import * as checkoutService from "../services/checkout.service.js";
import * as orderService from "../services/order.service.js";

const router = Router();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "ecommerce-demo" });
});

router.get("/api/catalog/products", (_req, res) => {
  res.json({ products: catalogService.listProducts() });
});

router.get("/api/catalog/products/:sku", (req, res) => {
  const product = catalogService.getProduct(req.params.sku);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json({ product });
});

router.post("/api/cart/items", (req, res) => {
  const { sku, qty, cartId } = req.body ?? {};
  const result = catalogService.addCartItem({ sku, qty, cartId });
  if (result.status === "invalid") {
    return res.status(400).json({ error: "sku y qty requeridos" });
  }
  res.status(201).json(result);
});

router.post("/api/checkout", async (req, res) => {
  const { cartId, paymentMethod } = req.body ?? {};
  const result = await checkoutService.processCheckout({ cartId, paymentMethod });
  if (result.status === "missing_cart") {
    return res.status(400).json({ error: "cartId requerido" });
  }
  res.status(201).json({
    orderId: result.orderId,
    cartId: result.cartId,
    status: result.paymentStatus,
  });
});

router.get("/api/orders/:orderId", async (req, res) => {
  const order = await orderService.getOrder(req.params.orderId);
  res.json(order);
});

router.post("/api/orders/:orderId/cancel", (req, res) => {
  const { reason } = req.body ?? {};
  const result = orderService.cancelOrder(req.params.orderId, reason);
  res.json(result);
});

router.get("/api/inventory/:sku", (req, res) => {
  const result = catalogService.getInventory(req.params.sku);
  if (result.status === "unknown_sku") {
    return res.status(404).json({ error: "SKU desconocido" });
  }
  if (result.status === "out_of_stock") {
    return res.status(409).json({ error: "Sin stock", sku: result.sku });
  }
  res.json({ sku: result.sku, stock: result.stock });
});

/** Anti-patrón: console.log en lugar de logger estructurado */
router.get("/api/admin/audit-legacy", async (_req, res) => {
  await delay(30);
  console.log("AUDITORÍA LEGACY — operación sin Winston ni contexto de negocio");
  res.json({
    aviso: "Revisar consola: este endpoint no usa el logger estructurado",
  });
});

export default router;
