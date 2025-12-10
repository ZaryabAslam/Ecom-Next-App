import mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  image?: string;
}
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);
export default (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);
