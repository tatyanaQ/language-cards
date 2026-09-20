import { Router, Request, Response } from 'express';
import { authMiddleware } from './auth/middleware';
import authRouter from './auth/router';
import { Types } from 'mongoose';
import { Question } from './db/models/question';
import { getLesson } from './service/lesson';
import { generateLesson } from './ai/service';

const router = Router();

router.use('/auth', authRouter);

router.use(authMiddleware);

router.get('/', (req: Request, res: Response) => {
  res.json({ data: 'hello from api' });
});

router.get('/tags', async (req: Request, res: Response) => {
  const { _id } = res.locals.user;
  const questions = await Question.find({ userId: _id });
  const allTags = questions.flatMap(({ tags }) => tags);

  res.json({
    tags: Array.from(new Set(allTags)),
  });
});

router.get('/questions', async (req: Request, res: Response) => {
  const { _id } = res.locals.user;
  const {
    id,
    item,
    translation,
    tag,
    page = '1',
    limit = '100',
  } = req.query || {};

  const query = {
    userId: _id,
    ...(id && { _id: new Types.ObjectId(id.toString()) }),
    ...(item && { item: new RegExp(String(item), 'i') }),
    ...(translation && { translation: new RegExp(String(translation), 'i') }),
    ...(tag && { tags: tag }),
  };

  const numberPage = Number(page);
  const numberLimit = Number(limit);

  const options = {
    skip: (numberPage - 1) * numberLimit,
    limit: numberLimit,
  };

  const questions = await Question.find(query, null, options);
  const count = await Question.countDocuments(query);

  res.json({ questions, count });
});

router.get('/lesson', async (req: Request, res: Response) => {
  const { _id } = res.locals.user;
  const limit = Number(req.query?.limit) ?? 20;
  const onlyUnreplied = req.query?.onlyUnreplied === 'true';

  const rawTags = req.query?.tags;
  const tags = rawTags?.length
    ? (Array.isArray(rawTags) ? rawTags : [rawTags]).map((tag) => String(tag))
    : undefined;

  const questions = await getLesson({
    userId: _id,
    tags,
    limit,
    noReplies: onlyUnreplied,
  });

  res.json({ questions });
});

router.get('/lesson-ai', async (req: Request, res: Response) => {
  const { _id } = res.locals.user;
  const limit = Math.min(Number(req.query?.limit) ?? 20, 20);

  const rawTags = req.query?.tags;
  const tags = rawTags
    ? (Array.isArray(rawTags) ? rawTags : [rawTags]).map((tag) => String(tag))
    : undefined;

  const questions = await getLesson({ userId: _id, tags, limit });

  const aiLesson = await generateLesson(questions);

  res.json({ questions, aiLesson });
});

router.post('/reply', async (req: Request, res: Response) => {
  const { questionId } = req.body;
  if (!questionId) {
    res.status(400).json({ error: 'questionId is required' });
    return;
  }

  const question = await Question.findById(questionId);
  if (!question) {
    res.status(404).json({ error: 'Question not found' });
    return;
  }

  await question.updateOne({ $inc: { 'replies.count': 1 } });

  res.json({ status: 'ok' });
});

export default router;
