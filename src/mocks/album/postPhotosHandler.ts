import { createApiHandler } from 'mocks/createApiHandler';
import { AddPhotoDto } from 'models/gallery';

type Params = {
  coupleId: string;
  albumId: string;
};

export const postPhotosHandler = createApiHandler<Params, AddPhotoDto, null>(
  '/couples/:coupleId/gallerys/albums/:albumId/photos/create',
  'post',
  () => ({
    200: null,
    400: null,
  })
);
