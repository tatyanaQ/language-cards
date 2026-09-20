import { Schema } from 'mongoose';

export interface IReply {
  count: number;
}

export const replySchema = new Schema<IReply>(
  {
    count: { type: Number, required: true },
  },
  { _id: false }
);
