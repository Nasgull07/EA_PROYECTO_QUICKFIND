import { IOrderChange, OrderChangeModel } from "../models/order_change";

export class OrderChangeService {
  // Crear un nuevo registro de cambio de orden
  async createOrderChange(orderChangeData: IOrderChange): Promise<IOrderChange> {
    try {
      const newOrderChange = new OrderChangeModel(orderChangeData);
      return await newOrderChange.save();
    } catch (error: any) {
      throw new Error(`Error al crear el cambio de orden: ${error.message}`);
    }
  }

  // Obtener un cambio de orden por su ID
  async getOrderChangeById(id: string): Promise<IOrderChange | null> {
    try {
      return await OrderChangeModel.findById(id)
        .populate("order_id")
        .populate("user_id");
    } catch (error: any) {
      throw new Error(`Error al obtener el cambio de orden: ${error.message}`);
    }
  }

  // Obtener los cambios de orden por user_id
    async getOrderChangesByUserId(userId: string): Promise<IOrderChange[]> {
        try {
        return await OrderChangeModel.find({ user_id: userId })
            .populate("order_id")
            .populate("user_id");
        } catch (error: any) {
        throw new Error(`Error al obtener los cambios de orden por usuario: ${error.message}`);
        }
    }

  // Obtener todos los registros de cambios de orden con paginación
  async getAllOrderChanges(page: number, limit: number): Promise<IOrderChange[]> {
    const skip = (page - 1) * limit;
    try {
      return await OrderChangeModel.find()
        .populate("order_id")
        .populate("user_id")
        .skip(skip)
        .limit(limit);
    } catch (error: any) {
      throw new Error(`Error al obtener los cambios de orden: ${error.message}`);
    }
  }

  // Actualizar un cambio de orden por su ID
  async updateOrderChange(
    id: string,
    updateData: Partial<IOrderChange>
  ): Promise<IOrderChange | null> {
    try {
      return await OrderChangeModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (error: any) {
      throw new Error(`Error al actualizar el cambio de orden: ${error.message}`);
    }
  }

  // Eliminar un cambio de orden por su ID
  async deleteOrderChange(id: string): Promise<IOrderChange | null> {
    try {
      return await OrderChangeModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error(`Error al eliminar el cambio de orden: ${error.message}`);
    }
  }
}