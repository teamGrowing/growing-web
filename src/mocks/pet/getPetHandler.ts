import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PetDto } from 'models/pet';
import bear from './data/bear_default.glb';

type Params = {
  coupleId: string;
  petId: string;
};

export const getPetHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PetDto>
>('couples/:coupleId/pets/:petId', 'get', ({ petId }) => ({
  200: {
    petId,
    name: '곰곰이',
    imageUrl: bear,
    talkingBox: null,
    hungryGauge: 30,
    attentionGauge: 80,
    loveGauge: 40,
  },
  400: null,
}));
