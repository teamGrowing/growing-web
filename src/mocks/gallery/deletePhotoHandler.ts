import { createApiHandler } from 'mocks/createApiHandler';
import { photoData } from './data/data';

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
  onSuccess: ({ photoId }) => {
    const photo = photoData.find((p) => p.id === photoId);
    if (!photo) return;
    photo.isDeleted = true;
  },
});
