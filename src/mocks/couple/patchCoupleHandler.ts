import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeCoupleDto } from 'models/couple';

type Params = {
  coupleId: string;
};

export const patchCoupleHandler = createApiHandler<
  Params,
  ChangeCoupleDto,
  null
>('/couples/:coupleId', 'patch', () => ({
  200: null,
  400: null,
}));
