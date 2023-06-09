import { IEnterprise } from "@/models/entities/IEnterprise";
import { dateIsBetween, getWeekDay } from "./date.helper";
import { EnterpriseMenuFormattedType } from "@/models/pages/IEnterpriseMenuProps";

export const enterpriseIsClosed = (
  enterprise: IEnterprise | EnterpriseMenuFormattedType
) => {
  if (!enterprise.schedules?.length) return false;

  const todayWeekDay = getWeekDay();

  const schedule = enterprise.schedules.find(
    (sched) => sched.weekDay === todayWeekDay
  );

  if (!schedule) return false;

  const now = new Date();

  const from = new Date(schedule.from);
  const to = new Date(schedule.to);

  return dateIsBetween({ date: now, from, to });
};
