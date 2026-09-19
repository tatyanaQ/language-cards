import { Router, Request, Response } from 'express';
import { signToken } from './utils';
import { User, UserDocument } from '../db/models/user';
import bcrypt from 'bcrypt';
import { authMiddleware } from './middleware';

const router = Router();

const getUserResponse = (user: UserDocument) => ({
  _id: user._id.toString(),
  username: user.username,
  lastLoggedInAt: user.lastLoggedInAt,
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ error: 'Missing credentials' });
    return;
  }

  let user = await User.findOne({ username });

  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({ username, passwordHash });
    await user.save();

    const token = signToken({ userId: user._id.toString() });
    res.status(201).json({
      token,
      user: getUserResponse(user),
    });
    return;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  user.lastLoggedInAt = new Date();
  await user.save();

  const token = signToken({ userId: user._id.toString() });
  res.json({
    token,
    user: getUserResponse(user),
  });
});

router.get('/check', authMiddleware, async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(200).json({ user: getUserResponse(user) });
});

export default router;
