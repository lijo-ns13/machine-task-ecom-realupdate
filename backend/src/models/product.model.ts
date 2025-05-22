import mongoose, { Document, Schema, Types } from "mongoose";
import { v4 as uuid4 } from "uuid";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  uniqueId: string;
  name: string;
  description: string;
  price: number;
  mediaIds: mongoose.Types.ObjectId[];
}
const productSchema = new Schema<IProduct>({
  uniqueId: {
    type: String,
    default: uuid4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    min: [6, "minimum six characters must"],
  },
  price: {
    type: Number,
    required: true,
  },
  mediaIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },
  ],
});

export default mongoose.model<IProduct>("Product", productSchema);
