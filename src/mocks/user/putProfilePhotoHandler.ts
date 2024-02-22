import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeUserPhotoDto } from 'models/user';

type Params = {
  userId: string;
};

export const putProfilePhotoHandler = createApiHandler<
  Params,
  ChangeUserPhotoDto,
  null
>({
  path: '/users/:userId/profile-photos',
  method: 'put',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
