import { DaySchedule } from "./day-schedule";
import { ScheduleToolbox } from "./schedule-toolbox";
import { RefreshCcwDot, SunMedium } from "lucide-react";
import { useScheduleLogic } from "../contexts/schedule-logic-context";
import { formatDate } from "../utils/date";
import { DayPhase } from "../types";
import { ICSunset } from "./icons/sunset";
import React, { useState } from "react";
import { ConfirmResetScheduleModal } from "./confirm-reset-schedule-modal";
import { useUpdateDaysSettingMutation } from "../hooks/use-schedule-mutation";
import { v4 as uuidv4 } from "uuid";
import "../styles/week-schedule.css";

type WeekScheduleProps = {
  isHalfDay: boolean;
};

export const WeekSchedule = ({ isHalfDay }: WeekScheduleProps) => {
  const {
    openRepeatModal,
    localSchedule,
    hasChangesSchedule,
    setLocalSchedule,
    originalData,
    setIsHalfDayMode,
  } = useScheduleLogic();
  const { mutate: updateDaysSetting, isPending: isPendingSave } =
    useUpdateDaysSettingMutation();
  const [isOpenConfrimResetModal, setIsOpenConfirmResetModal] =
    useState<boolean>(false);

  const onReset = () => {
    setLocalSchedule(structuredClone(originalData));
    for (const daySetting of Object.values(originalData)) {
      if (
        daySetting[DayPhase.AM].dayStatus !== daySetting[DayPhase.PM].dayStatus
      ) {
        setIsHalfDayMode(true);
        break;
      }
    }
    setIsOpenConfirmResetModal(false);
  };

  const onSave = () => {
    updateDaysSetting({ daysSetting: Object.values(localSchedule) });
  };

  return (
    <React.Fragment>
      {isOpenConfrimResetModal && (
        <ConfirmResetScheduleModal
          onClose={() => setIsOpenConfirmResetModal(false)}
          onReset={onReset}
        />
      )}
      <div className="week-schedule">
        <ScheduleToolbox />

        <div
          className="week-days"
          style={{
            marginLeft: isHalfDay ? "55px" : "0px",
          }}
        >
          {Object.values(localSchedule).map((day) => (
            <div key={uuidv4()} className="day-header">
              <span className="day-title-card">{formatDate(day.date)}</span>
            </div>
          ))}
        </div>

        <div
          className="schedule-grid"
          style={{
            gridTemplateColumns: isHalfDay
              ? "40px repeat(5, 1fr)"
              : "repeat(5, 1fr)",
          }}
        >
          {isHalfDay && (
            <div className="time-column">
              <div className="time-marker">
                <SunMedium size={28} color="#fdb557" />
              </div>
            </div>
          )}

          {Object.values(localSchedule).map((day) => (
            <DaySchedule
              key={uuidv4()}
              daySetting={day}
              isHalfDay={isHalfDay}
              displayPhase={isHalfDay ? DayPhase.AM : DayPhase.FULL}
            />
          ))}
        </div>

        {isHalfDay && (
          <div className="schedule-grid">
            <div className="time-column">
              <div className="time-marker">
                <ICSunset
                  height={22}
                  width={22}
                  color="#8494ff"
                  style={{
                    padding: "4px",
                  }}
                />
              </div>
            </div>

            {Object.values(localSchedule).map((day) => (
              <DaySchedule
                key={uuidv4()}
                daySetting={day}
                isHalfDay={isHalfDay}
                displayPhase={DayPhase.PM}
              />
            ))}
          </div>
        )}

        <div className="repeat-schedule-btn-container">
          <button
            className="repeat-schedule-btn disable-border-btn"
            onClick={openRepeatModal}
          >
            <RefreshCcwDot
              size={18}
              style={{
                color: "gray",
              }}
            />
            <span style={{ fontWeight: 800 }}>Repeat the schedule</span>
          </button>
          <div className="schedule-actions">
            {hasChangesSchedule && (
              <>
                <button
                  className="reset-btn disable-border-btn"
                  onClick={() => setIsOpenConfirmResetModal(true)}
                >
                  Reset
                </button>
                <button
                  className="confirm-btn"
                  onClick={onSave}
                  disabled={isPendingSave}
                  style={{
                    background: isPendingSave ? "gray" : "#ff8e00",
                    boxShadow: isPendingSave ? "none" : "0px 3px #fe6137",
                  }}
                >
                  {isPendingSave ? "Saving..." : "Confirm schedule"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
