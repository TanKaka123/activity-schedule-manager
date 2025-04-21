import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = { id: 'user-id-placeholder' };
  next();
}