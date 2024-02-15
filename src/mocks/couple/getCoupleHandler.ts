import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { CoupleDto } from 'models/couple';

type Params = {
  coupleId: string;
};

export const getCoupleHandler = createApiHandler<
  Params,
  {},
  NullableResponse<CoupleDto>
>('/couples/:coupleId', 'get', ({ coupleId }) => ({
  200: {
    coupleId,
    myName: '연주',
    partnerName: '민지',
    dayCount: 777,
    petId: '1',
  },
  400: null,
}));
