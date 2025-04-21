import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useScheduleState } from "../hooks/use-schedule-state";
import { useScheduleNavigation } from "../hooks/use-schedule-navigation";
import { ScheduleData, ViewMode } from "../types";

type SheduleLogicContextProps = {
  children: ReactNode;
};

type SheduleLogicContextType = {
  // STATE
  currentWeekStart: Date;
  setCurrentWeekStart: React.Dispatch<React.SetStateAction<Date>>;

  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  isHalfDayMode: boolean;
  setIsHalfDayMode: React.Dispatch<React.SetStateAction<boolean>>;
  
  isRepeatModalOpen: boolean;
  setIsRepeatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasChangesSchedule: boolean;
  localSchedule: ScheduleData;
  setLocalSchedule: React.Dispatch<React.SetStateAction<ScheduleData>>;
  originalData: ScheduleData;
  setOriginalData: React.Dispatch<React.SetStateAction<ScheduleData>>;

  toggleHalfDayMode: () => void;

  // repeat modal
  openRepeatModal: () => void;
  closeRepeatModal: () => void;

  //navigation
  navigateToToday: () => void;
  navigateToPreviousWeek: () => void;
  navigateToNextWeek: () => void;
};

const SheduleLogicContext = createContext<SheduleLogicContextType>(
  {} as SheduleLogicContextType
);

export const SheduleLogicProvider = ({
  children,
}: SheduleLogicContextProps) => {
  const state = useScheduleState();

  const navigation = useScheduleNavigation(state.setCurrentWeekStart);

  const toggleHalfDayMode = useCallback(
    () => state.setIsHalfDayMode((prev) => !prev),
    [state]
  );
  const openRepeatModal = useCallback(
    () => state.setIsRepeatModalOpen(true),
    [state]
  );
  const closeRepeatModal = useCallback(
    () => state.setIsRepeatModalOpen(false),
    [state]
  );

  const values = useMemo(
    () => ({
      ...state,
      ...navigation,
      toggleHalfDayMode,
      openRepeatModal,
      closeRepeatModal,
    }),
    [
      state,
      navigation,
      toggleHalfDayMode,
      openRepeatModal,
      closeRepeatModal,
    ]
  );

  return (
    <SheduleLogicContext.Provider value={values}>
      {children}
    </SheduleLogicContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScheduleLogic = () => {
  const context = useContext(SheduleLogicContext);
  if (!context) {
    throw new Error(
      "useSheduleLogic must be used within a SheduleLogicProvider"
    );
  }
  return context;
};
