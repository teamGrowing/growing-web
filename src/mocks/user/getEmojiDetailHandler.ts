import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { EmojiLineDto } from 'models/user';
import bear01 from './data/bear_01.png';
import bear17 from './data/bear_17.png';
import cat06 from './data/cat_06.png';
import cat23 from './data/cat_23.png';

type Params = {
  userId: string;
  emojiId: string;
};

const bearData: EmojiLineDto[] = [
  {
    id: '01',
    name: 'growing-bear',
    imageUrl: bear01,
  },
  {
    id: '17',
    name: 'growing-bear',
    imageUrl: bear17,
  },
];

const catData: EmojiLineDto[] = [
  {
    id: '06',
    name: 'growing-cat',
    imageUrl: cat06,
  },
  {
    id: '23',
    name: 'growing-cat',
    imageUrl: cat23,
  },
];

const getData = (id: string) => {
  if (id === 'growing-bear') {
    return bearData;
  }
  return catData;
};

export const getEmojiDetailHandler = createApiHandler<
  Params,
  {},
  NullableResponse<EmojiLineDto[]>
>({
  path: '/users/:userId/emojis/:emojiId',
  method: 'get',
  requestHandler: ({ emojiId }) => ({
    200: getData(emojiId),
    400: null,
  }),
});
