import { Schema, model, Document, Types } from 'mongoose';

interface IUser {
  username: string;
  passwordHash: string;
  createdAt: Date;
  lastLoggedInAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  lastLoggedInAt: { type: Date, required: true, default: Date.now },
});

export const User = model<IUser>('User', userSchema);

export type UserDocument = IUser & Document<Types.ObjectId>;
