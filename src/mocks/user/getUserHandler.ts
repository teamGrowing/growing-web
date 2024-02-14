import { UserDto } from 'models/user';
import { http, HttpResponse } from 'msw';

type Params = {
  userId: string;
};
type RequestBody = {};
type ResponseBody = UserDto;

export const getUserHandler = http.get<Params, RequestBody, ResponseBody>(
  '/user/:userId',
  ({ params }) => {
    const { userId } = params;

    return HttpResponse.json(
      {
        id: `id${userId}`,
        nickName: `nickname${userId}`,
        birthDay: new Date(),
        anniversaryDay: new Date(),
        imageUrl: null,
        coupleId: '123',
        code: '1234',
      },
      {
        status: 200,
        statusText: 'success',
      }
    );
  }
);
