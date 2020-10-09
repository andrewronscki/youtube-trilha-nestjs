import { Document } from "mongoose";

export interface Notification extends Document {
  userId: number;
  type: 'email' | 'sms';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}