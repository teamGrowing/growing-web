import { createApiHandler } from 'mocks/createApiHandler';
import { CreatePlanDto } from 'models/plan';
import { v4 as uuidv4 } from 'uuid';
import { plansData } from './data/plans';

type Params = {
  coupleId: string;
};

export const postPlanHandler = createApiHandler<Params, CreatePlanDto, null>({
  path: '/couples/:coupleId/plans/create',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: async (_, req) => {
    const data = await req.json();
    plansData.push({ ...data, id: uuidv4(), isDeleted: false });
  },
});
