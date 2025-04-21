import { DaySetting, DayStatus } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useScheduleLogic } from "../contexts/schedule-logic-context";
import {
  dayOfAWeek,
  repeatWeekSetting,
  updateDaysSetting,
} from "../lib/fetcher";
import { getFirstFiveDays } from "../utils/schedule";

export const useScheduleQuery = (startDate: number) => {
  return useQuery({
    queryKey: ["schedule", format(new Date(startDate), "yyyy-MM-dd")],
    queryFn: () => dayOfAWeek(startDate),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateDaysSettingMutation = () => {
  const { setLocalSchedule, setOriginalData } = useScheduleLogic();

  return useMutation({
    mutationFn: ({ daysSetting }: { daysSetting: DaySetting[] }) =>
      updateDaysSetting(daysSetting),
    onSuccess: async (data) => {
      const filteredData = getFirstFiveDays(data.days);
      setLocalSchedule(filteredData);
      setOriginalData(structuredClone(filteredData));
    },
    onError: (error) => {
      console.error("Update schedule error:", error);
    },
  });
};

export const useRepeatScheduleMutation = () => {
  const { setLocalSchedule, setOriginalData } = useScheduleLogic();

  return useMutation({
    mutationFn: ({
      startDateTargetWeek,
      numberOfRepeatingWeek,
      repeatFor,
    }: {
      startDateTargetWeek: number;
      numberOfRepeatingWeek: number;
      repeatFor: DayStatus[];
    }) =>
      repeatWeekSetting({
        startDateTargetWeek,
        numberOfRepeatingWeek,
        repeatFor,
      }),
    onSuccess: async (data) => {
      const filteredData = getFirstFiveDays(data.days);
      setLocalSchedule(filteredData);
      setOriginalData(structuredClone(filteredData));
    },
    onError: (error) => {
      console.error("Repeat schedule error:", error);
    },
  });
};
