import { QueryKey, useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import PLAN_API from '../../services/plan.service';
import { DailyPlanDto } from '../../types/plan/DailyPlan.dto';
import { MonthlyPlanDto } from '../../types/plan/MonthlyPlan.dto';

const useCalendarMonthlyPlans = ({
  coupleId,
  year,
  month,
  storeCode,
  options,
}: {
  coupleId: string | null | undefined;
  year: string;
  month: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<MonthlyPlanDto>;
}) => {
  useQuery(
    [...queryKeys.calendarKeys.byMonth(year, month), ...(storeCode ?? [])],
    {
      queryFn: () => PLAN_API.getPlans(coupleId ?? '', year, month),
      select: (data) => data.data,
      ...options,
    }
  );
};

export const useCalendarDailyPlans = ({
  coupleId,
  year,
  month,
  day,
  storeCode,
  options,
}: {
  coupleId: string | null | undefined;
  year: string;
  month: string;
  day: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<DailyPlanDto>;
}) => {
  useQuery(
    [...queryKeys.calendarKeys.byDay(year, month, day), ...(storeCode ?? [])],
    {
      queryFn: () => PLAN_API.getPlans(coupleId ?? '', year, month, day),
      select: (data) => data.data,
      ...options,
    }
  );
};

export default useCalendarMonthlyPlans;
