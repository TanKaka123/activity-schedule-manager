import { DaySetting, DayStatus, ScheduleData } from "../types";
import { apiClient } from "./api-client";

type DaysOfAWeekResponse = {
  days: ScheduleData;
  userId: string;
};
export async function dayOfAWeek(startDate: number) {
  const { data } = await apiClient.get<DaysOfAWeekResponse>(
    `/api/schedules/?startDate=${startDate}`
  );
  return data;
}

type UpdateDayStatus = {
  days: ScheduleData;
  userId: string;
};
export async function updateDaysSetting(daysSetting: DaySetting[]) {
  const { data } = await apiClient.post<UpdateDayStatus>(
    "api/schedules/set-day",
    {
      daysSetting,
    }
  );

  return data;
}

export async function repeatWeekSetting({
  startDateTargetWeek,
  numberOfRepeatingWeek,
  repeatFor,
}: {
  startDateTargetWeek: number;
  numberOfRepeatingWeek: number;
  repeatFor: DayStatus[];
}) {
  const { data } = await apiClient.post("/api/schedules/repeat", {
    startDateTargetWeek,
    numberOfRepeatingWeek,
    repeatFor,
  });

  return data;
}
