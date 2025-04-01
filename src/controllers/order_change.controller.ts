import { Request, Response } from "express";
import { IOrderChange } from "../models/order_change";
import { ObjectId } from "mongodb";
import { OrderChangeService } from "../services/order_change.service";

const orderChangeService = new OrderChangeService();

/**
 * @swagger
 * /api/order-changes:
 *   post:
 *     summary: Create a new order change
 *     tags: [OrderChanges]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderChange'
 *     responses:
 *       201:
 *         description: The order change was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderChange'
 *       400:
 *         description: Error creating order change
 */
export async function createOrderChange(req: Request, res: Response): Promise<void> {
  try {
    const orderChange = req.body as IOrderChange;
    delete orderChange._id;
    const newOrderChange = await orderChangeService.createOrderChange(orderChange);
    res.status(201).json(newOrderChange);
  } catch (error) {
    res.status(400).json({ message: "Error creating order change", error });
  }
}

/**
 * @swagger
 * /api/order-changes:
 *   get:
 *     summary: Get all order changes with pagination
 *     tags: [OrderChanges]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of order changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderChange'
 */
export async function getAllOrderChanges(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const orderChanges = await orderChangeService.getAllOrderChanges(page, limit);
        res.status(200).json(orderChanges);
    } catch (error) {
        res.status(400).json({ message: "Error getting order changes", error });
    }
}

/**
 * @swagger
 * /api/order-changes/user/{userId}:
 *   get:
 *     summary: Get order changes by user ID
 *     tags: [OrderChanges]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to filter order changes
 *     responses:
 *       200:
 *         description: A list of order changes for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderChange'
 */
export async function getOrderChangesByUserId(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;
        const orderChanges = await orderChangeService.getOrderChangesByUserId(userId);
        res.status(200).json(orderChanges);
    } catch (error) {
        res.status(400).json({ message: "Error getting order changes by user ID", error });
    }
    }

/**
 * @swagger
 * /api/order-changes/{id}:
 *   get:
 *     summary: Get an order change by ID
 *     tags: [OrderChanges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order change ID
 *     responses:
 *       200:
 *         description: The order change details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderChange'
 *       400:
 *         description: Error getting order change
 */
export async function getOrderChangeById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const orderChange = await orderChangeService.getOrderChangeById(id);
    res.status(200).json(orderChange);
  } catch (error) {
    res.status(400).json({ message: "Error getting order change", error });
  }
}

/**
 * @swagger
 * /api/order-changes/{id}:
 *   put:
 *     summary: Update an order change by ID
 *     tags: [OrderChanges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order change ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderChange'
 *     responses:
 *       200:
 *         description: The updated order change
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderChange'
 *       400:
 *         description: Error updating order change
 */
export async function updateOrderChangeById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const orderChange = req.body as Partial<IOrderChange>;
    const updatedOrderChange = await orderChangeService.updateOrderChange(id, orderChange);
    res.status(200).json(updatedOrderChange);
  } catch (error) {
    res.status(400).json({ message: "Error updating order change", error });
  }
}

/**
 * @swagger
 * /api/order-changes/{id}:
 *   delete:
 *     summary: Delete an order change by ID
 *     tags: [OrderChanges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order change ID
 *     responses:
 *       200:
 *         description: The deleted order change
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderChange'
 *       400:
 *         description: Error deleting order change
 */
export async function deleteOrderChangeById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const deletedOrderChange = await orderChangeService.deleteOrderChange(id);
    res.status(200).json(deletedOrderChange);
  } catch (error) {
    res.status(400).json({ message: "Error deleting order change", error });
  }
}