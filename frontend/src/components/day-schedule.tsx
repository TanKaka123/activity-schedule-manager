import { useMemo, useState } from "react";
import { ChevronDown, Clock5, House, Laptop } from "lucide-react";
import { DayPhase, DaySetting, DayStatus, SeatInfo } from "../types";
import { useScheduleLogic } from "../contexts/schedule-logic-context";

type DayScheduleProps = {
  daySetting: DaySetting;
  isHalfDay: boolean;
  displayPhase: DayPhase;
};

const MOCK_SEAT_INFO: SeatInfo = {
  floor: "1",
  number: "2",
};
const MOCK_VALUES_SEAT_INFO = ["F7 - Seat 01", "F7 - Seat 02", "F7 - Seat 03"];

export const DaySchedule = ({ daySetting, displayPhase }: DayScheduleProps) => {
  const { setLocalSchedule } = useScheduleLogic();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { dayStatus } = useMemo(() => {
    if (displayPhase === DayPhase.PM) {
      return daySetting[DayPhase.PM];
    }

    return daySetting[DayPhase.AM];
  }, [daySetting, displayPhase]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleStatusChange = (status: DayStatus) => {
    const cloneDaySetting: DaySetting = { ...daySetting };
    if (displayPhase === DayPhase.FULL) {
      cloneDaySetting[DayPhase.AM].dayStatus = status;
      cloneDaySetting[DayPhase.PM].dayStatus = status;
    } else {
      cloneDaySetting[displayPhase].dayStatus = status;
    }

    setLocalSchedule((prev) => ({
      ...prev,
      [new Date(daySetting.date).getTime()]: cloneDaySetting,
    }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="day-schedule">
      <div className={`status-display`}>
        <div className="status-text">{dayStatus}</div>
        {dayStatus === "WAO" ? (
          <div className="seat-info" onClick={toggleDropdown}>
            <span>
              {MOCK_SEAT_INFO.floor} - Seat {MOCK_SEAT_INFO.number}
            </span>
            <ChevronDown size={16} />
          </div>
        ) : (
          <div style={{ height: "30px" }} />
        )}
      </div>
      <div className="status-actions">
        {[
          {
            value: "WFH",
            icon: <Laptop color={dayStatus === "WFH" ? "white" : "#d1d1d1"} />,
          },
          {
            value: "WAO",
            icon: <House color={dayStatus === "WAO" ? "white" : "#d1d1d1"} />,
          },
          {
            value: "OFF",
            icon: <Clock5 color={dayStatus === "OFF" ? "white" : "#d1d1d1"} />,
          },
        ].map((status) => (
          <button
            key={status.value}
            className={`status-btn ${
              dayStatus === status.value ? `${status.value}-active` : ""
            }`}
            onClick={() => handleStatusChange(status.value as DayStatus)}
          >
            {status.icon}
          </button>
        ))}
      </div>

      {isDropdownOpen && (
        <div className="seat-dropdown">
          {MOCK_VALUES_SEAT_INFO.map((seatInfo) => (
            <div key={seatInfo} className="seat-option">
              {seatInfo}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
