import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { ICLaptop } from "./icons/laptop";
import { ICHome } from "./icons/home";
import { DayStatus } from "../types";

type RepeatScheduleModalProps = {
  onClose: () => void;
  onRepeat: (
    numberOfRepeatingWeek: number,
    selectedOptions: DayStatus[]
  ) => void;
  isPendingRepeat: boolean;
};

export const RepeatScheduleModal = ({
  onClose,
  onRepeat,
  isPendingRepeat,
}: RepeatScheduleModalProps) => {
  const [numberOfRepeatingWeek, setNumberOfRepeatingWeek] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<DayStatus[]>([]);

  const handleCheckboxChange = (option: DayStatus) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleIncrement = () => {
    setNumberOfRepeatingWeek((prev) => Math.min(prev + 1, 12));
  };

  const handleDecrement = () => {
    setNumberOfRepeatingWeek((prev) => Math.max(prev - 1, 1));
  };

  const isAllowSave = selectedOptions.length > 0 && !isPendingRepeat;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Repeat the schedule</h2>
          <button className="close-btn" onClick={onClose}>
            <X color="white" size={16} />
          </button>
        </div>

        <div className="modal-content">
          <span className="repeat-option-text">Repeat option:</span>
          <div className="repeat-option">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#ff8e00",
                borderRadius: "100%",
                border: "3px solid white",
                outline: "2px solid #ff8e00",
              }}
            />
            <span>Repeat for</span>

            <div className="number-input">
              <div className="number-input-vertical">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={numberOfRepeatingWeek}
                  onChange={(e) =>
                    setNumberOfRepeatingWeek(
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                />
                <div className="controls">
                  <button onClick={handleIncrement} className="up">
                    <ChevronUp size={20} />
                  </button>
                  <button onClick={handleDecrement} className="down">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>

            <span>week{numberOfRepeatingWeek !== 1 ? "s" : ""} (total 7)</span>
          </div>

          <div className="repeat-for">
            <span className="repeat-option-text">Repeat for:</span>
            <div className="option-grid">
              <div className="option-card">
                <input
                  type="checkbox"
                  id={DayStatus.WAO}
                  checked={selectedOptions.includes(DayStatus.WAO)}
                  onChange={() => handleCheckboxChange(DayStatus.WAO)}
                />
                <label htmlFor={DayStatus.WAO} className="card-label">
                  <div className="checkbox" />
                  <div className="card-icon">
                    <ICLaptop height={42} width={42} />
                  </div>
                  <span>Work at office</span>
                </label>
              </div>

              <div className="option-card">
                <input
                  type="checkbox"
                  id={DayStatus.WFH}
                  checked={selectedOptions.includes(DayStatus.WFH)}
                  onChange={() => handleCheckboxChange(DayStatus.WFH)}
                />
                <label htmlFor={DayStatus.WFH} className="card-label">
                  <div className="checkbox" />
                  <div className="card-icon">
                    <ICHome height={42} width={42} />
                  </div>
                  <span>Work from home</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn disable-border-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-btn disable-border-btn"
            disabled={!isAllowSave}
            style={
              !isAllowSave
                ? {
                    pointerEvents: "none",
                    cursor: "default",
                    opacity: 0.5,
                  }
                : {}
            }
            onClick={() => onRepeat(numberOfRepeatingWeek, selectedOptions)}
          >
            {isPendingRepeat ? "...Saving" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
