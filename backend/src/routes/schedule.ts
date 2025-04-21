import { Router } from 'express';
import { ScheduleController } from '../controllers/ScheduleController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
router.use(authMiddleware);
router.get('/', ScheduleController.getAWeek);
router.post('/set-day', ScheduleController.setDay);
router.post('/repeat', ScheduleController.repeat);

export default router;


