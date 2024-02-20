import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PetDto } from 'models/pet';
import cat from './data/cat_default.glb';

type Params = {
  coupleId: string;
  petId: string;
};

const data: PetDto = {
  petId: '1',
  name: '냥이',
  imageUrl: cat,
  talkingBox: null,
  hungryGauge: 30,
  attentionGauge: 80,
  loveGauge: 40,
};

export const getPetHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PetDto>
>({
  path: 'couples/:coupleId/pets/:petId',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
