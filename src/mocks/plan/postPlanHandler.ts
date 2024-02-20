import { createApiHandler } from 'mocks/createApiHandler';
import { DailyPlanDto } from 'models/plan';

type Params = {
  coupleId: string;
};

export const postPlanHandler = createApiHandler<Params, {}, DailyPlanDto[]>({
  path: '/couples/:coupleId/plans/create',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
