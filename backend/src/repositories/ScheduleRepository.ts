import { IScheduleRepository } from "./IScheduleRepository";
import { ScheduleModel, ISchedule, IDaySetting } from "../models/Schedule";

export class ScheduleRepository implements IScheduleRepository {
  async findByUser(userId: string) {
    return ScheduleModel.findOne({ userId }).exec();
  }
  async save(schedule: ISchedule) {
    return schedule.save();
  }
  async delete(userId: string) {
    await ScheduleModel.deleteOne({ userId }).exec();
  }
  
  async upsertDay(
    userId: string,
    date: number,
    daySetting: IDaySetting
  ) {
    const schedule = await this.findByUser(userId);
    if (!schedule) throw new Error("Schedule not found");

    schedule.days[date] = daySetting;
    return await this.save(schedule);
  }

  async removeDay(userId: string, date: number) {
    const schedule = await this.findByUser(userId);
    if (!schedule) throw new Error("Schedule not found");

    delete schedule.days[date];
    return this.save(schedule);
  }
}
