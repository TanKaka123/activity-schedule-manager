import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "../services/ScheduleService";
import { RepeatSubsequentStrategy } from "../strategies/RepeatSubsequentStrategy";
import { NoRepeatStrategy } from "../strategies/NoRepeatStrategy";
import { ScheduleRepository } from "../repositories/ScheduleRepository";
import { GetAWeekDTO, RepeatDTO, SetDayDTO } from "../dtos/schedule";

const repo = new ScheduleRepository();

export class ScheduleController {
  static async getAWeek(
    req: Request<{}, {}, {}, GetAWeekDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { startDate } = req.query;
      const op = new ScheduleService(repo, new NoRepeatStrategy());
      const schedule = await op.getSchedule(req.user.id, Number(startDate));

      res.json(schedule);
    } catch (err) {
      next(err);
    }
  }

  static async setDay(
    req: Request<{}, {}, SetDayDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { daysSetting } = req.body;
      const op = new ScheduleService(repo, new NoRepeatStrategy());
      const updated = await op.setDays(req.user.id, daysSetting);

      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async repeat(
    req: Request<{}, {}, RepeatDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { startDateTargetWeek, numberOfRepeatingWeek, repeatFor } =
        req.body;
      const op = new ScheduleService(
        repo,
        new RepeatSubsequentStrategy(numberOfRepeatingWeek, repeatFor)
      );
      const created = await op.repeatWeek({
        userId: req.user.id,
        startDateTargetWeek,
      });
      
      res.json(created);
    } catch (err) {
      next(err);
    }
  }
}
