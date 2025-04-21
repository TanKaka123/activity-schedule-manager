import { ChevronUp } from "lucide-react";
import { useScheduleLogic } from "../contexts/schedule-logic-context";

export const ScheduleHeader = () => {
  const { viewMode, setViewMode } = useScheduleLogic();

  return (
    <div className="schedule-header">
      <div className="header-title">
        <h1>My Schedule</h1>
        <button className="collapse-button disable-border-btn" aria-label="Collapse panel">
          <ChevronUp />
        </button>
      </div>

      <div className="view-toggle">
        <button
          className={`view-toggle-btn ${viewMode === "week" ? "active" : ""}`}
          onClick={() => setViewMode("week")}
        >
          Week
        </button>
        <button
          className={`view-toggle-btn ${viewMode === "month" ? "active" : ""}`}
          onClick={() => setViewMode("month")}
        >
          Month
        </button>
      </div>
    </div>
  );
};
