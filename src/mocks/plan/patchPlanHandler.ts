import { createApiHandler } from 'mocks/createApiHandler';
import { DailyPlanDto, PatchPlanDto } from 'models/plan';
import { plansData } from './data/plans';

type Params = {
  coupleId: string;
  planId: string;
};

export const patchPlanHandler = createApiHandler<
  Params,
  PatchPlanDto,
  DailyPlanDto
>({
  path: '/couples/:coupleId/plans/:planId',
  method: 'patch',
  requestHandler: () => {
    return {
      200: null,
      400: null,
    };
  },
  onSuccess: async ({ planId }, req) => {
    const data = await req.json();
    const planIdx = plansData.findIndex((p) => p.id === planId);
    plansData[planIdx] = { ...plansData[planIdx], ...data };
  },
});
