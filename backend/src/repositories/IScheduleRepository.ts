import { IDaySetting, ISchedule } from "../models/Schedule";

export interface IScheduleRepository {
  findByUser(userId: string): Promise<ISchedule | null>;
  save(schedule: ISchedule): Promise<ISchedule>;
  delete(userId: string, weekStart: Date): Promise<void>;
  upsertDay(
    userId: string,
    date: number,
    daySetting: IDaySetting
  ): Promise<ISchedule>;
  removeDay(userId: string, date: number): Promise<ISchedule>;
}
