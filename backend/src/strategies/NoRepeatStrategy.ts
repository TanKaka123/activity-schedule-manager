import { RepeatStrategy } from './RepeatStrategy';
import { ISchedule } from '../models/Schedule';

export class NoRepeatStrategy implements RepeatStrategy {
  apply(schedule: ISchedule) {
    return schedule;
  }
}