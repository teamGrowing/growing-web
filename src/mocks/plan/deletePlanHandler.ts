import { createApiHandler } from 'mocks/createApiHandler';

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
});
