import { ObjectId, Schema, model } from "mongoose";

// Definición de la interfaz IOrderChange
export interface IOrderChange {
  _id?: ObjectId;
  order_id: ObjectId; // Relación con la orden
  user_id: ObjectId; // Relación con el usuario que realizó el cambio
  changeDate: Date; // Fecha del cambio
  changes: string; // Descripción de los cambios realizados
}

// Creación del esquema del historial de cambios de órdenes
const orderChangeSchema = new Schema<IOrderChange>({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  changeDate: { type: Date, default: Date.now },
  changes: { type: String, required: true },
});

// Exportación del modelo OrderChange
export const OrderChangeModel = model<IOrderChange>("OrderChange", orderChangeSchema);