import { Schema, model, Document, Types } from 'mongoose';
import { User } from './user';
import { IReply, replySchema } from './replies';

interface IQuestion {
  userId: Types.ObjectId;
  item: string;
  translation: string;
  tags?: string[];
  note?: string;
  replies?: IReply;
}

const questionSchema = new Schema<IQuestion>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  item: { type: String, required: true },
  translation: { type: String, required: true },
  tags: { type: [String] },
  note: { type: String },
  replies: { type: replySchema },
});

export const Question = model<IQuestion>('Question', questionSchema);

export type QuestionDocument = { _id: Types.ObjectId } & IQuestion & Document;
