import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoDto } from 'models/gallery';
import { photoData } from './data/data';

type Params = {
  coupleId: string;
  photoId: string;
};

export const getPhotoDetailHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoDto>
>({
  path: `/couples/:coupleId/gallerys/photos/:photoId`,
  method: 'get',
  requestHandler: (params) => ({
    200: photoData.find((d) => d.id === params.photoId) ?? photoData[0],
    400: null,
  }),
});
