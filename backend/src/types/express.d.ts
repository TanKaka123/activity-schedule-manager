import { UserInfo } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
}
