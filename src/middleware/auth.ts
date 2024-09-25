import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
