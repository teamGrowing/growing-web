import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeUserDto } from 'models/user';

type Params = {
  userId: string;
};

export const patchUserHandler = createApiHandler<Params, ChangeUserDto, null>(
  '/users/:userId/update',
  'patch',
  () => ({
    200: null,
    400: null,
  })
);
