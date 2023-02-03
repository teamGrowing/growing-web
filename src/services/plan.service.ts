import fetcher from '.';
import { CreatePlanDto } from '../types/plan/CreatePlan.dto';
import { DailyPlanDto } from '../types/plan/DailyPlan.dto';
import { PatchPlanDto } from '../types/plan/PatchPlan.dto';

const PLAN_API = {
  // TODO: query 문 작성 필요
  getPlans: (coupleId: string) =>
    fetcher.create().get(`couples/${coupleId}/plans`),
  postPlan: (coupleId: string, data: CreatePlanDto) =>
    fetcher
      .create()
      .post<DailyPlanDto>(`couples/${coupleId}/plans/create`, data),
  patchPlan: (coupleId: string, planId: string, data: PatchPlanDto) =>
    fetcher
      .create()
      .post<DailyPlanDto>(`couples/${coupleId}/plans/${planId}`, data),
  deletePlan: (coupleId: string, planId: string) =>
    fetcher.create().post(`couples/${coupleId}/plans/${planId}`),
};

export default PLAN_API;
