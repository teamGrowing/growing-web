import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { AlbumDto } from 'models/gallery';
import { albumsData } from './data';

type Params = {
  coupleId: string;
};

export const getAlbumHandler = createApiHandler<
  Params,
  {},
  NullableResponse<AlbumDto[]>
>({
  path: '/couples/:coupleId/gallerys/albums',
  method: 'get',
  requestHandler: () => ({
    200: albumsData.reduce<AlbumDto[]>((acc, { isDeleted, ...rest }) => {
      if (!isDeleted) {
        acc.push(rest);
      }
      return acc;
    }, []),
    400: null,
  }),
});
