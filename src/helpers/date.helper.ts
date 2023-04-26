import { WeekDay } from "@/enums/WeekDay.enum";

export const getWeekDay = (date: Date = new Date()): WeekDay => {
  return (date.getDay() + 1).toString() as WeekDay;
};
