
import * as mongoose from "mongoose";

export const NotificationSchema = new mongoose.Schema({
  userId: Number,
  type: String,
  response: Object,
  status: String,
}, { timestamps: true, collection: 'notifications' });