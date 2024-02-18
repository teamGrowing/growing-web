import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  photoId: string;
};

export const deletePhotoHandler = createApiHandler<Params, {}, null>(
  '/couples/:coupleId/gallerys/photos/:photoId',
  'delete',
  () => ({
    200: null,
    400: null,
  })
);
