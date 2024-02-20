import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PostPetDto } from 'models/pet';
import bear from './data/bear_thanks.png';

type Params = {
  coupleId: string;
  petId: string;
};

const data: PostPetDto = {
  id: '1',
  imageUrl: bear,
  name: '곰곰일',
  createdAt: new Date('2023-12-10').toISOString(),
  endedAt: new Date('2024-02-14').toISOString(),
  description: '안녕하세용',
};

export const getGraduatedPetDetailHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PostPetDto>
>({
  path: '/couples/:coupleId/post-pets/:petId',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
