import { Types } from 'mongoose';
import { Question } from '../db/models/question';

export const createExampleQuestion = async (userId: Types.ObjectId) => {
  const item = `sveiki`;
  const translation = 'hello';

  const q = new Question({
    userId,
    item,
    translation,
    tags: ['example'],
    note: 'auto-generated example question',
  });

  await q.save();
  return q;
};
