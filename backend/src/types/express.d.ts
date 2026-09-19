import { UserDocument } from '../db/models/user';

declare global {
  namespace Express {
    interface Locals {
      user: UserDocument;
    }
  }
}

export {};
