import { createApiHandler } from 'mocks/createApiHandler';
import { plansData } from './data/plans';

type Params = {
  coupleId: string;
  planId: string;
};

export const deletePlanHandler = createApiHandler<Params, null, null>({
  path: '/couples/:coupleId/plans/:planId',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ planId }) => {
    const plan = plansData.find((p) => p.id === planId);
    if (!plan) return;
    plan.isDeleted = true;
  },
});
