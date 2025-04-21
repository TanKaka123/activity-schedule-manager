import { useMemo, useState } from "react";
import { startOfWeek } from "date-fns";
import { DayPhase, DaySetting, ScheduleData, ViewMode } from "../types";

export const useScheduleState = () => {
  const realtimeCurrentWeekStart = useMemo(
    () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    []
  );

  const [currentWeekStart, setCurrentWeekStart] = useState(
    realtimeCurrentWeekStart
  );
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [isHalfDayMode, setIsHalfDayMode] = useState(false);
  
  const [isRepeatModalOpen, setIsRepeatModalOpen] = useState(false);

  const [localSchedule, setLocalSchedule] = useState<ScheduleData>({});
  const [originalData, setOriginalData] = useState<ScheduleData>({});

  const hasChangesSchedule = useMemo(() => {
    const phases: (keyof Pick<DaySetting, DayPhase.AM | DayPhase.PM>)[] = [
      DayPhase.AM,
      DayPhase.PM,
    ];

    for (const date in localSchedule) {
      const localDay = localSchedule[+date];
      const originalDay = originalData[+date];

      if (!originalDay) return true;

      for (const phase of phases) {
        const local = localDay[phase];
        const original = originalDay[phase];

        if (local.dayStatus !== original.dayStatus) return true;
      }
    }
    return false
  }, [originalData, localSchedule]);

  return {
    currentWeekStart,
    setCurrentWeekStart,
    viewMode,
    setViewMode,
    isHalfDayMode,
    setIsHalfDayMode,
    isRepeatModalOpen,
    setIsRepeatModalOpen,
    hasChangesSchedule,
    localSchedule,
    setLocalSchedule,
    originalData,
    setOriginalData,
  };
};
