import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PostPetLineDto } from 'models/pet';
import bear from './data/bear_thanks.png';
import cat from './data/cat_heart.png';

type Params = {
  coupleId: string;
};

const data: PostPetLineDto[] = [
  {
    id: '1',
    imageUrl: bear,
    name: '곰곰일',
    endedAt: new Date().toISOString(),
  },
  {
    id: '2',
    imageUrl: bear,
    name: '곰곰이',
    endedAt: new Date().toISOString(),
  },
  {
    id: '3',
    imageUrl: bear,
    name: '곰곰삼',
    endedAt: new Date().toISOString(),
  },
  {
    id: '4',
    imageUrl: cat,
    name: '냥일',
    endedAt: new Date().toISOString(),
  },
];

export const getGraduatedPetsHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PostPetLineDto[]>
>('/couples/:coupleId/post-pets', 'get', () => ({
  200: data,
  400: null,
}));
