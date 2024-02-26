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
>({
  path: '/couples/:coupleId/gallerys/photos',
  method: 'get',
  requestHandler: (_, request) => {
    const searchParams = getSearchParams(request.url);
    const limit = searchParams.get('limit');
    const base = searchParams.get('base');

    let returnData: PhotoLineDto[] = [];

    if (limit && base) {
      returnData = photoData
        .slice(Number(base), Number(base) + Number(limit))
        .reduce<PhotoLineDto[]>((acc, curr) => {
          if (!curr.isDeleted) {
            acc.push({
              i: curr.id,
              u: curr.urls,
              c: curr.createdAt,
              t: curr.time,
            });
          }
          return acc;
        }, []);
    } else {
      returnData = photoData.reduce<PhotoLineDto[]>((acc, curr) => {
        if (!curr.isDeleted) {
          acc.push({
            i: curr.id,
            u: curr.urls,
            c: curr.createdAt,
            t: curr.time,
          });
        }
        return acc;
      }, []);
    }

    return {
      200: returnData,
      400: null,
    };
  },
});
