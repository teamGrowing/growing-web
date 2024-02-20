import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeUserPhotoDto } from 'models/user';

type Params = {
  userId: string;
};

export const putProfilePhotoHandler = createApiHandler<
  Params,
  ChangeUserPhotoDto,
  null
>('/users/:userId/profile-photos', 'put', () => ({
  200: null,
  400: null,
}));
