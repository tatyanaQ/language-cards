import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt-payload';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_TTL = '24h';

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TTL });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
