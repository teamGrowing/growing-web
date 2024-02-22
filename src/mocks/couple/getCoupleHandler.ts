import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { CoupleDto } from 'models/couple';

type Params = {
  coupleId: string;
};

const data: CoupleDto = {
  coupleId: '1',
  myName: '연주',
  partnerName: '민지',
  dayCount: 777,
  petId: '1',
};

export const getCoupleHandler = createApiHandler<
  Params,
  {},
  NullableResponse<CoupleDto>
>({
  path: '/couples/:coupleId',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
