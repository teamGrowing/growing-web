import { createApiHandler } from 'mocks/createApiHandler';
import { DailyPlanDto, PatchPlanDto } from 'models/plan';

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
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
