import { createApiHandler } from 'mocks/createApiHandler';
import { DailyPlanDto } from 'models/plan';

type Params = {
  coupleId: string;
};

export const postPlanHandler = createApiHandler<Params, {}, DailyPlanDto[]>(
  '/couples/:coupleId/plans/create',
  'post',
  () => ({
    200: null,
    400: null,
  })
);
