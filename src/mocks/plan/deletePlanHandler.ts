import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  planId: string;
};

export const deletePlanHandler = createApiHandler<Params, null, null>(
  '/couples/:coupleId/plans/:planId',
  'delete',
  () => ({
    200: null,
    400: null,
  })
);
