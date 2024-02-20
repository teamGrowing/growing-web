import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PetDto, PetReactionDto } from 'models/pet';
import cat from './data/cat_default.glb';
import catFeed from './data/cat_feed.glb';
import catTouch from './data/cat_touch.glb';

type Params = {
  coupleId: string;
  petId: string;
};

let petData: PetDto = {
  petId: '1',
  name: '냥이',
  imageUrl: cat,
  talkingBox: null,
  hungryGauge: 30,
  attentionGauge: 80,
  loveGauge: 40,
};

const randomVariable = Math.floor(Math.random() * 2);

const defaultPetReaction: PetReactionDto = {
  petImageUrl: cat,
  hungryGauge: 30,
  talkingBox: null,
  attentionGauge: petData.attentionGauge,
  loveGauge: petData.loveGauge,
  petCare: {
    touchCount: 0,
    isHaveDinner: 0,
    isHaveBreakfast: 0,
    isUseStorage: 0,
    isMaleSpeakLoveU: 0,
    isFemaleSpeakLoveU: 0,
    id: '1',
  },
};

const getPetFeedReactionData = (gauge: number): PetReactionDto[] => [
  {
    ...defaultPetReaction,
    hungryGauge: gauge + 2,
    petImageUrl: catFeed,
  },
  {
    ...defaultPetReaction,
    hungryGauge: gauge - 2,
  },
];

const updatePetFeedGauge = () => {
  if (randomVariable === 0) {
    petData = {
      ...petData,
      hungryGauge: petData.hungryGauge + 2,
    };
  } else {
    petData = {
      ...petData,
      hungryGauge: petData.hungryGauge - 2,
    };
  }
};

const getPetTouchReactionData = (gauge: number): PetReactionDto[] => [
  {
    ...defaultPetReaction,
    attentionGauge: gauge + 2,
    petImageUrl: catTouch,
  },
  {
    ...defaultPetReaction,
    attentionGauge: gauge - 2,
  },
];

const updatePetAttentionGauge = () => {
  if (randomVariable === 0) {
    petData = {
      ...petData,
      attentionGauge: petData.attentionGauge + 2,
    };
  } else {
    petData = {
      ...petData,
      attentionGauge: petData.attentionGauge - 2,
    };
  }
};

export const getPetHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PetDto>
>({
  path: '/couples/:coupleId/pets/:petId',
  method: 'get',
  requestHandler: () => ({
    200: petData,
    400: null,
  }),
});

export const postFeedPetHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PetReactionDto>
>({
  path: '/couples/:coupleId/pets/:petId/feed',
  method: 'post',
  requestHandler: () => {
    return {
      200: getPetFeedReactionData(petData.hungryGauge)[randomVariable],
      400: null,
    };
  },
  onSuccess: updatePetFeedGauge,
});

export const postTouchPetHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PetReactionDto>
>({
  path: '/couples/:coupleId/pets/:petId/touch',
  method: 'post',
  requestHandler: () => {
    return {
      200: getPetTouchReactionData(petData.attentionGauge)[randomVariable],
      400: null,
    };
  },
  onSuccess: updatePetAttentionGauge,
});
