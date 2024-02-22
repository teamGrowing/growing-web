import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeCoupleDto } from 'models/couple';

type Params = {
  coupleId: string;
};

export const patchCoupleHandler = createApiHandler<
  Params,
  ChangeCoupleDto,
  null
>({
  path: '/couples/:coupleId',
  method: 'patch',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
