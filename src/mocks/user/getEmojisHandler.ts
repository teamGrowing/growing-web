import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { EmojiPackageLineDto } from 'models/user';

type Params = {
  userId: string;
};

const data: EmojiPackageLineDto[] = [
  {
    id: 'growing-bear',
    name: 'growing-bear',
  },
  {
    id: 'growing-cat',
    name: 'growing-cat',
  },
];

export const getEmojisHandler = createApiHandler<
  Params,
  {},
  NullableResponse<EmojiPackageLineDto[]>
>({
  path: '/users/:userId/emojis',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
