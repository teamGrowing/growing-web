import { CreateAlbumDto } from 'models/gallery';
import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
};

export const postAlbumsHandler = createApiHandler<Params, CreateAlbumDto, null>(
  {
    path: '/couples/:coupleId/gallerys/albums/create',
    method: 'post',
    requestHandler: () => ({
      200: null,
      400: null,
    }),
  }
);
