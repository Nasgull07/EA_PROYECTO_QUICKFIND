import { Router } from "express";
import {
  createOrderChange,
  getOrderChangeById,
  updateOrderChangeById,
  deleteOrderChangeById,
  getAllOrderChanges,
    getOrderChangesByUserId,
} from "../controllers/order_change.controller";

const router = Router();

router.post("/", createOrderChange); // Crear un nuevo cambio de orden
router.get("/:id", getOrderChangeById); // Obtener un cambio de orden por ID
router.put("/:id", updateOrderChangeById); // Actualizar un cambio de orden por ID
router.delete("/:id", deleteOrderChangeById); // Eliminar un cambio de orden por ID
router.get("/", getAllOrderChanges); // Obtener todos los cambios de orden con paginación
router.get("/user/:userId", getOrderChangesByUserId); // Obtener cambios de orden por user_id

export default router;