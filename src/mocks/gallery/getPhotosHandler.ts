import {
  NullableResponse,
  createApiHandler,
  getSearchParams,
} from 'mocks/createApiHandler';
import { PhotoLineDto } from 'models/gallery';
import { photoData } from './data/data';

type Params = {
  coupleId: string;
};

export const getPhotosHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoLineDto[]>
>('/couples/:coupleId/gallerys/photos', 'get', (_, request) => {
  const searchParams = getSearchParams(request.url);
  const limit = Number(searchParams.get('limit'));
  const base = Number(searchParams.get('base'));

  let returnData: PhotoLineDto[] = [];

  if (limit >= 0 && base >= 0) {
    returnData = photoData.slice(base, base + limit).map((d) => ({
      i: d.id,
      u: d.urls,
      c: d.createdAt,
      t: d.time,
    }));
  } else {
    returnData = photoData.map((d) => ({
      i: d.id,
      u: d.urls,
      c: d.createdAt,
      t: d.time,
    }));
  }

  return {
    200: returnData,
    400: null,
  };
});
