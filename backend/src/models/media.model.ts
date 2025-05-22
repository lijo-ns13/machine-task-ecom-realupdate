import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMedia extends Document {
  _id: Types.ObjectId;
  s3Key: string; // store object key, not URL ->from that key generate signed url for limited time
  mimeType: "image/jpeg" | "image/png" | "video/mp4";
}

const MediaSchema = new Schema<IMedia>(
  {
    s3Key: { type: String, required: true, index: true },
    mimeType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp"],
    },
  },
  { timestamps: true }
);

MediaSchema.index({ createdAt: -1 });

export default mongoose.model<IMedia>("Media", MediaSchema);
