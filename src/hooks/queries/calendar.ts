import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'constants/queryKeys';
import {
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import PLAN_API from 'apis/plan';
import {
  CreatePlanDto,
  DailyPlanDto,
  MonthlyPlanDto,
  PatchPlanDto,
} from 'models/plan';

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
  options?: UseQueryOptionsType<MonthlyPlanDto[]>;
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
  options?: UseMutationOptionsType<string>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => PLAN_API.deletePlan(coupleId ?? '', planId),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.calendarKeys.plan); // TODO key 좀더 효율적이게 바꾸기
    },
    ...options,
  });
}

export function useAddPlanMutation({
  coupleId,
  options,
}: {
  coupleId: string | null;
  options?: UseMutationOptionsType<CreatePlanDto>;
}): UseMutationResult<AxiosResponse, AxiosError, CreatePlanDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (planInfo) => PLAN_API.postPlan(coupleId ?? '', planInfo),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.calendarKeys.plan); // TODO key 좀더 효율적이게 바꾸기
    },
    ...options,
  });
}

export function useModifyPlanMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<{ id: string; info: PatchPlanDto }>;
}): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { id: string; info: PatchPlanDto },
  unknown
> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (planInfo: { id: string; info: PatchPlanDto }) =>
      PLAN_API.patchPlan(coupleId, planInfo.id, planInfo.info),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.calendarKeys.plan);
    },
    ...options,
  });
}
