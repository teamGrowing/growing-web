import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  albumId: string;
};

export const deleteAlbumHandler = createApiHandler<Params, {}, null>(
  '/couples/:coupleId/gallerys/albums/:albumId',
  'delete',
  () => ({
    200: null,
    400: null,
  })
);
