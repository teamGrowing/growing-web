import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  photoId: string;
};

export const deletePhotoHandler = createApiHandler<Params, {}, null>({
  path: '/couples/:coupleId/gallerys/photos/:photoId',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
