import { useCallback, useEffect } from "react";
import { ScheduleHeader } from "./schedule-header";
import { RepeatScheduleModal } from "./repeat-schedule-modal";
import "../styles/schedule.css";

import { WeekSchedule } from "./week-schedule";
import { useScheduleLogic } from "../contexts/schedule-logic-context";
import {
  useRepeatScheduleMutation,
  useScheduleQuery,
} from "../hooks/use-schedule-mutation";
import { Loader } from "./loader";
import { getFirstFiveDays } from "../utils/schedule";
import { toast, ToastContainer } from "react-toastify";
import { DayPhase, DayStatus } from "../types";

export const SchedulePage = () => {
  const {
    isHalfDayMode,
    isRepeatModalOpen,
    closeRepeatModal,
    setLocalSchedule,
    currentWeekStart,
    setOriginalData,
  } = useScheduleLogic();
  const { data, isLoading } = useScheduleQuery(currentWeekStart.getTime());
  const { mutate: repeatSchedule, isPending: isPendingRepeat } =
    useRepeatScheduleMutation();
  const { localSchedule, setIsHalfDayMode } = useScheduleLogic();

  useEffect(() => {
    if (data) {
      const filteredData = getFirstFiveDays(data.days);

      for( const daySetting of Object.values(filteredData) ) {
        if(daySetting[DayPhase.AM].dayStatus !== daySetting[DayPhase.PM].dayStatus) {
          setIsHalfDayMode(true)
          break;
        }
      }

      setLocalSchedule(filteredData);
      setOriginalData(structuredClone(filteredData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onRepeat = useCallback(
    (numberOfRepeatingWeek: number, selectedOptions: DayStatus[]) => {
      repeatSchedule(
        {
          numberOfRepeatingWeek,
          repeatFor: selectedOptions,
          startDateTargetWeek: new Date(
            Object.values(localSchedule)[0].date
          ).getTime(),
        },
        {
          onSuccess: () => {
            toast.success("Schedule repeated successfully!");
            closeRepeatModal();
          },
          onError: () => {
            toast.error("Failed to repeat schedule. Please try again.");
          },
        }
      );
    },
    [closeRepeatModal, localSchedule, repeatSchedule]
  );

  return (
    <div className="schedule-container">
      <ScheduleHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <WeekSchedule isHalfDay={isHalfDayMode} />
          <ToastContainer />
          {isRepeatModalOpen && (
            <RepeatScheduleModal
              onRepeat={onRepeat}
              onClose={closeRepeatModal}
              isPendingRepeat={isPendingRepeat}
            />
          )}
        </>
      )}
    </div>
  );
};
