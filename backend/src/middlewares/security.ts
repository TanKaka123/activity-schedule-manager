import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';
import { Application, json, urlencoded } from 'express';

export function applySecurity(app: Application) {
  app.use(helmet());

  // Allow CORS from all origins
  app.use(cors({
    origin: 'https://activity-schedule-manager.vercel.app', 
    credentials: true,     
  }));

  // Compress all responses
  app.use(compression());

  // Limit the size of incoming requests (e.g., 100kb)
  app.use(json({ limit: '100kb' }));
  app.use(urlencoded({ extended: true, limit: '100kb' }));

  // Apply rate limiting: 100 requests per 15 minutes per IP
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  }));
}
