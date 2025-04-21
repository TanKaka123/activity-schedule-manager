type ConfirmResetScheduleModalProps = {
  onClose: () => void;
  onReset: () => void;
};

export const ConfirmResetScheduleModal = ({
  onClose,
  onReset,
}: ConfirmResetScheduleModalProps) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-content" style={{ paddingBottom: "0px" }}>
          <p style={{ fontSize: "18px", marginBottom: "0px" }}>
            Are you sure you want to repeat the schedule? This will reset the
            current progress.
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn disable-border-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn disable-border-btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
