import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoDto } from 'models/gallery';
import image1 from './data/album_image1.jpg';

type Params = {
  coupleId: string;
  photoId: string;
};

const data: PhotoDto = {
  id: '1',
  urls: image1,
  videoUrl: null,
  createdAt: new Date().toUTCString(),
  name: 'Name',
  time: null,
};
export const getPhotoDetailHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoDto>
>(`/couples/:coupleId/gallerys/photos/:photoId`, 'get', () => ({
  200: data,
  400: null,
}));
