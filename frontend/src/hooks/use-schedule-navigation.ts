import { startOfWeek, addWeeks, subWeeks } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export const useScheduleNavigation = (
  setCurrentWeekStart: Dispatch<SetStateAction<Date>>
) => ({
  navigateToToday: () =>
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 })),
  navigateToPreviousWeek: () =>
    setCurrentWeekStart((prev) => subWeeks(prev, 1)),
  navigateToNextWeek: () => setCurrentWeekStart((prev) => addWeeks(prev, 1)),
});
