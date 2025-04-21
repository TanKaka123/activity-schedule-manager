export enum DayPhase {
  FULL = "FULL",
  AM = "AM",
  PM = "PM",
}
export enum DayStatus {
  WFH = "WFH",
  WAO = "WAO",
  OFF = "OFF",
}

export type ViewMode = "week" | "month";

export type SeatInfo = {
  floor: string;
  number: string;
};

export type DaySetting = {
  date: Date;
  [DayPhase.AM]: {
    dayStatus: DayStatus;
    seatInfo?: SeatInfo;
  };
  [DayPhase.PM]: {
    dayStatus: DayStatus;
    seatInfo?: SeatInfo;
  };
};

export type ScheduleData = {
  [date: number]: DaySetting;
};
