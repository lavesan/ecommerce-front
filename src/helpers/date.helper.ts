import { WeekDay } from "@/enums/WeekDay.enum";
import { ISchedule } from "@/models/entities/ISchedule";

export const getWeekDay = (date: Date = new Date()): WeekDay => {
  return (date.getDay() + 1).toString() as WeekDay;
};

interface IDateIsBetweenParams {
  date: Date;
  from: Date;
  to: Date;
}

export const dateIsBetween = ({
  date,
  from,
  to,
}: IDateIsBetweenParams): boolean => date >= from && date <= to;

const addDigits = (digits: number) => {
  return digits.toString().length > 1 ? digits : `0${digits}`;
};

export const formatSchedule = ({ from, to }: ISchedule) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return {
    from: `${addDigits(fromDate.getHours())}:${addDigits(
      fromDate.getMinutes()
    )}`,
    to: `${addDigits(toDate.getHours())}:${addDigits(toDate.getMinutes())}`,
  };
};
