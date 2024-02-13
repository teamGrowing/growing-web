import { CreatePlanDto } from 'types/plan/CreatePlan.dto';
import { DailyPlanDto } from 'types/plan/DailyPlan.dto';
import { PatchPlanDto } from 'types/plan/PatchPlan.dto';
import fetcher from './fetcher';

const PLAN_API = {
  getPlans: (coupleId: string, year: string, month: string, day?: string) => {
    let url = `couples/${coupleId}/plans?year=${year}&month=${month}`;
    if (day) url += `&day=${day}`;
    return fetcher.create().get(url);
  },
  postPlan: (coupleId: string, data: CreatePlanDto) =>
    fetcher
      .create()
      .post<DailyPlanDto>(`couples/${coupleId}/plans/create`, data),
  patchPlan: (coupleId: string, planId: string, data: PatchPlanDto) =>
    fetcher
      .create()
      .patch<DailyPlanDto>(`couples/${coupleId}/plans/${planId}`, data),
  deletePlan: (coupleId: string, planId: string) =>
    fetcher.create().delete(`couples/${coupleId}/plans/${planId}`),
};

export default PLAN_API;
