import { createApiHandler } from 'mocks/createApiHandler';
import { albumsData } from './data';

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
  onSuccess: ({ albumId }) => {
    const album = albumsData.find((a) => a.id === albumId);
    if (!album) return;
    album.isDeleted = true;
  },
});
