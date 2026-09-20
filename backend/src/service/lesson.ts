import { Types } from 'mongoose';
import { Question, QuestionDocument } from '../db/models/question';

export const getLesson = async (params: {
  userId: Types.ObjectId;
  limit: number;
  tags?: string[];
  noReplies?: boolean;
}): Promise<QuestionDocument[]> => {
  const { userId, limit, tags, noReplies } = params;

  const query = {
    userId,
    ...(tags?.length ? { tags: { $in: tags } } : {}),
    ...(noReplies
      ? { $or: [{ 'replies.count': null }, { 'replies.count': 0 }] }
      : {}),
  };

  const pipeline = [{ $match: query }, { $sample: { size: limit } }];

  return await Question.aggregate(pipeline);
};
