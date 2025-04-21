import { IScheduleRepository } from "../repositories/IScheduleRepository";
import { RepeatStrategy } from "../strategies/RepeatStrategy";
import {
  ScheduleModel,
  ISchedule,
  IDaySetting,
  DayPhase,
} from "../models/Schedule";
import { A_DAY } from "../constants/time";
import {
  DEFAULT_PHASE_SETTING,
  DEFAULT_STATUS_SETTING,
} from "../constants/schedule";

export class ScheduleService {
  constructor(
    private scheduleRepository: IScheduleRepository,
    private repeatStrategy: RepeatStrategy
  ) {}

  // get 7 Days in a week or all days
  async getSchedule(
    userId: string,
    startDate?: number,
    initSchedule?: ISchedule | null
  ): Promise<ISchedule> {
    let schedule =
      initSchedule !== undefined
        ? initSchedule
        : await this.scheduleRepository.findByUser(userId);

    if (!startDate) {
      return schedule || new ScheduleModel({ userId, days: {} });
    }

    const days: Record<string, IDaySetting> = {};
    // convert map mongodb to OBJECT
    const pureDaysObject = schedule?.days
      ? Object.fromEntries(schedule.days as unknown as Map<string, IDaySetting>)
      : {};

    // Populate 7-day window starting from startDate
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate + i * A_DAY);
      const dateMillisecond = date.getTime();

      days[dateMillisecond] = pureDaysObject[dateMillisecond.toString()] || {
        date,
        [DayPhase.AM]: {
          dayStatus: DEFAULT_STATUS_SETTING,
        },
        [DayPhase.PM]: {
          dayStatus: DEFAULT_STATUS_SETTING,
        },
      };
    }

    // If no existing schedule, create and save a new one; otherwise update days.
    if (!schedule) {
      schedule = new ScheduleModel({ userId, days });
      await this.scheduleRepository.save(schedule);
    } else {
      schedule.days = days;
    }
    return schedule;
  }

  async setDays(userId: string, daysSetting: IDaySetting[]) {
    // get schedule setting all day
    const schedule = await this.getSchedule(userId);

    // convert map mongodb to OBJECT
    const pureDaysObject = Object.fromEntries(
      schedule.days as unknown as Map<string, IDaySetting>
    );

    for (const daySetting of daysSetting) {
      const dateKey = new Date(daySetting.date).getTime().toString();
      pureDaysObject[dateKey] = daySetting;
    }

    schedule.days = pureDaysObject;
    await this.scheduleRepository.save(schedule);

    const newSchedule = await this.getSchedule(
      userId,
      new Date(daysSetting[0].date).getTime()
    );
    return newSchedule;
  }

  async repeatWeek({
    userId,
    startDateTargetWeek,
  }: {
    userId: string;
    startDateTargetWeek: number;
  }) {
    const initSchedule = await this.scheduleRepository.findByUser(userId);
    const schedule = await this.getSchedule(
      userId,
      startDateTargetWeek,
      initSchedule
    );

    // Generate clones based on repeat strategy
    const clones = this.repeatStrategy.apply(
      schedule,
      initSchedule ? initSchedule : schedule
    );

    return await this.scheduleRepository.save(clones);
  }
}
