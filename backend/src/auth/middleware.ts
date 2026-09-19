import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './utils';
import { User } from '../db/models/user';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header('authorization') || req.header('Authorization');
  if (!auth) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const [, token] = auth.split(' ');
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const payload = verifyToken(token);
    if (typeof payload !== 'object' || !payload?.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.locals.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
};
