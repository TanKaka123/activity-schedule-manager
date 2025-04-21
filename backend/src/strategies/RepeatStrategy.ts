import { ISchedule } from "../models/Schedule";

export interface RepeatStrategy {
  apply(targetDaysSchedule: ISchedule, fullDaysSchedule: ISchedule): ISchedule;
}
