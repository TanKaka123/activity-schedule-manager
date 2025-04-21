import { ChevronRight, ChevronLeft } from "lucide-react";
import { addDays, format } from "date-fns";
import { useScheduleLogic } from "../contexts/schedule-logic-context";
import { DayPhase } from "../types";
import { toast, ToastContainer } from "react-toastify";
import { formatDate } from "../utils/date";
import React from "react";

export const ScheduleToolbox = () => {
  const {
    navigateToToday,
    navigateToPreviousWeek,
    navigateToNextWeek,
    isHalfDayMode,
    toggleHalfDayMode,
    localSchedule,
    currentWeekStart,
  } = useScheduleLogic();

  const weekEnd = addDays(currentWeekStart, 4); // 5 day work week
  const dateRangeText = `${format(currentWeekStart, "MMM dd")} - ${format(
    weekEnd,
    "dd, yyyy"
  )}`;

  const onToggleModeView = () => {
    const daysSetting = Object.values(localSchedule);
    for (const daySetting of daysSetting) {
      if (
        daySetting[DayPhase.AM].dayStatus !== daySetting[DayPhase.PM].dayStatus
      ) {
        toast.warning(
          `Cannot switch view mode because the morning and afternoon statuses on ${formatDate(
            daySetting.date
          )} are different.`
        );

        return;
      }
    }
    toggleHalfDayMode();
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="schedule-controls">
        <div className="navigation-controls">
          <button
            className="today-btn disable-border-btn"
            onClick={navigateToToday}
          >
            Today
          </button>
          <button
            className="nav-btn disable-border-btn"
            onClick={navigateToPreviousWeek}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="nav-btn disable-border-btn"
            onClick={navigateToNextWeek}
          >
            <ChevronRight size={16} />
          </button>
          <span className="current-week">{dateRangeText}</span>
        </div>

        <div className="action-controls">
          <button disabled className="notify-btn disable-border-btn">
            <span>Notify manager</span>
          </button>

          <button
            className="full-day-toggle disable-border-btn"
            onClick={onToggleModeView}
          >
            Schedule as {isHalfDayMode ? "full" : "half"} day
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
