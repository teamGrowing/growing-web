import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { UserDto } from 'models/user';

type Params = {
  userId: string;
};

const data: UserDto = {
  id: '1',
  nickName: `곰곰곰`,
  birthDay: new Date(),
  anniversaryDay: new Date(),
  imageUrl: null,
  coupleId: '123',
  code: '1234',
};

export const getUserHandler = createApiHandler<
  Params,
  {},
  NullableResponse<UserDto>
>({
  path: '/users/:userId',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
