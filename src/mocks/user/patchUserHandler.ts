import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeUserDto } from 'models/user';

type Params = {
  userId: string;
};

export const patchUserHandler = createApiHandler<Params, ChangeUserDto, null>({
  path: '/users/:userId/update',
  method: 'patch',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
