import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import PLAN_API from '../../services/plan.service';
import { DailyPlanDto } from '../../types/plan/DailyPlan.dto';
import { MonthlyPlanDto } from '../../types/plan/MonthlyPlan.dto';

export function useCalendarMonthlyPlans({
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
}) {
  return useQuery(
    [...queryKeys.calendarKeys.byMonth(year, month), ...(storeCode ?? [])],
    {
      queryFn: () => PLAN_API.getPlans(coupleId ?? '', year, month),
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useCalendarDailyPlans({
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
  options?: UseQueryOptionsType<DailyPlanDto[]>;
}) {
  return useQuery(
    [...queryKeys.calendarKeys.byDay(year, month, day), ...(storeCode ?? [])],
    {
      queryFn: () => PLAN_API.getPlans(coupleId ?? '', year, month, day),
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useDeletePlanMutation({
  coupleId,
  options,
}: {
  coupleId: string | null;
  options?: UseMutationOptions<AxiosResponse, AxiosError, string, unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => PLAN_API.deletePlan(coupleId ?? '', planId),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.calendarKeys.plan); // TODO key 고쳐야함
    },
    ...options,
  });
}
