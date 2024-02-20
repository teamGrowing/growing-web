import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  albumId: string;
};

export const deleteAlbumHandler = createApiHandler<Params, {}, null>({
  path: '/couples/:coupleId/gallerys/albums/:albumId',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
