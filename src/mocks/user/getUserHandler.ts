import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { UserDto } from 'models/user';

type Params = {
  userId: string;
};

export const getUserHandler = createApiHandler<
  Params,
  {},
  NullableResponse<UserDto>
>('/users/:userId', 'get', ({ userId }) => ({
  200: {
    id: `id${userId}`,
    nickName: `nickname${userId}`,
    birthDay: new Date(),
    anniversaryDay: new Date(),
    imageUrl: null,
    coupleId: '123',
    code: '1234',
  },
  400: null,
}));
