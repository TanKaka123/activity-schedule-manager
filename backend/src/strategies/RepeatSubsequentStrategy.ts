import { RepeatStrategy } from "./RepeatStrategy";
import { DayPhase, IDaySetting, ISchedule, Status } from "../models/Schedule";
import { addWeeks } from "date-fns";
import { A_DAY } from "../constants/time";
import {
  DEFAULT_PHASE_SETTING,
  DEFAULT_STATUS_SETTING,
} from "../constants/schedule";

const phases: (keyof Pick<IDaySetting, DayPhase.AM | DayPhase.PM>)[] = [
  DayPhase.AM,
  DayPhase.PM,
];

export class RepeatSubsequentStrategy implements RepeatStrategy {
  /**
   * @param repeatWeeks - Number of weeks to repeat days. Defaults to 4.
   * @param statusesToRepeat - Array of Status values that should be repeated.
   */
  constructor(
    private numberOfRepeatingWeek: number = 4,
    private repeatFor: Status[]
  ) {}
  /**
   * Apply the repeat strategy to the provided schedules.
   *
   * This will take each day in targetSchedule with a phase matching one of the
   * statusesToRepeat and copy it into baseSchedule for the next `repeatWeeks` weeks.
   *
   * @param targetSchedule - Schedule containing days with statuses to repeat.
   * @param baseSchedule - Schedule into which repeated entries will be merged.
   * @returns A new ISchedule with repeated entries applied.
   */
  apply(targetDaysSchedule: ISchedule, fullDaysSchedule: ISchedule) {
    const clones: ISchedule = fullDaysSchedule;

    const targetDaysSetting = Object.fromEntries(
      targetDaysSchedule.days as unknown as Map<string, IDaySetting>
    );

    const fullDaysSetting = Object.fromEntries(
      fullDaysSchedule.days as unknown as Map<string, IDaySetting>
    );

    // list key string represent the target day
    const arrayTargetDays = Object.keys(targetDaysSetting);

    // sync data target days setting to full days setting
    for (const day of arrayTargetDays) {
      if (!fullDaysSetting[day]) {
        fullDaysSetting[day] = targetDaysSetting[day];
      }
    }

    // O(1)
    for (let i = 1; i <= this.numberOfRepeatingWeek; i++) {
      for (const day of arrayTargetDays) {
        for (const phase of phases) {
          if (
            this.repeatFor.includes(targetDaysSetting[day][phase].dayStatus)
          ) {
            const repeatedDay = new Date(Number(day) + i * 7 * A_DAY)
              .getTime()
              .toString();
            if (!fullDaysSetting[repeatedDay]) {
              fullDaysSetting[repeatedDay] = {
                date: new Date(Number(repeatedDay)),
                [DayPhase.AM]: {
                  dayStatus: DEFAULT_STATUS_SETTING,
                },
                [DayPhase.PM]: {
                  dayStatus: DEFAULT_STATUS_SETTING,
                },
              } as IDaySetting;
            }
            fullDaysSetting[repeatedDay][phase] = targetDaysSetting[day][phase];
          }
        }
      }
    }

    clones.days = fullDaysSetting;

    return clones;
  }
}
