import { Document, Schema, model } from "mongoose";

export enum DayPhase {
  FULL = "FULL",
  AM = "AM",
  PM = "PM",
}
export enum Status {
  WFH = "WFH",
  WAO = "WAO",
  OFF = "OFF",
}

export interface IDaySetting {
  date: Date;
  [DayPhase.AM]: {
    dayStatus: Status;
  };
  [DayPhase.PM]: {
    dayStatus: Status;
  };
}

export interface PureSchedule {
  userId: string;
  days: Record<string, IDaySetting>;
}

export interface ISchedule extends Document, PureSchedule {
  createdAt: Date;
  updatedAt: Date;
}

const DaySettingSchema = new Schema<IDaySetting>({
  date: { type: Date, required: true },
  [DayPhase.AM]: {
    dayStatus: { type: String, enum: Object.values(Status), required: true },
  },
  [DayPhase.PM]: {
    dayStatus: { type: String, enum: Object.values(Status), required: true },
  },
});
const ScheduleSchema = new Schema<ISchedule>(
  {
    userId: { type: String, required: true },
    days: {
      type: Map,
      of: DaySettingSchema,
      default: {},
    },
  },
  { timestamps: true }
);

export const ScheduleModel = model<ISchedule>("Schedule", ScheduleSchema);
