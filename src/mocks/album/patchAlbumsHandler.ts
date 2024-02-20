import { createApiHandler } from 'mocks/createApiHandler';
import { ChangeAlbumTitleDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

export const patchAlbumsHandler = createApiHandler<
  Params,
  ChangeAlbumTitleDto,
  null
>({
  path: '/couples/:coupleId/gallerys/albums/:albumId/change-title',
  method: 'patch',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
