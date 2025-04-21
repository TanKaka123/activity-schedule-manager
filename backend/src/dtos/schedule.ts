import { IDaySetting, Status } from "../models/Schedule";

export type GetAWeekDTO = {
  startDate: number;
};

export type SetDayDTO = {
  daysSetting: IDaySetting[]
};

export type RepeatDTO = {
  startDateTargetWeek: number;
  numberOfRepeatingWeek: number
  repeatFor: Status[]
};

export type ResetDTO = {
  startWeekDate: number;
};
