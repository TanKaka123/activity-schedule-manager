import { ScheduleData } from "../types";

export function getFirstFiveDays(days: ScheduleData ): ScheduleData {
  return Object.entries(days)
    .slice(0, 5)
    .reduce((acc: Record<string, typeof days[number]>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}