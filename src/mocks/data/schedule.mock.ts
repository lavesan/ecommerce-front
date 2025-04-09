import { ISchedule } from "@/models/entities/ISchedule";
import { WeekDay } from "@/enums/WeekDay.enum";

export const scheduleMock: ISchedule[] = [
  {
    id: "1",
    from: new Date("2024-01-01T08:00:00"),
    to: new Date("2024-01-01T18:00:00"),
    weekDay: WeekDay.SEG,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
    enterprise: undefined,
  },
];
