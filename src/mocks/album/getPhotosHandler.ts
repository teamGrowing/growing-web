import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoLineDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

const data: PhotoLineDto[] = [];

export const getPhotosHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoLineDto[]>
>('/couples/:coupleId/gallerys/photos', 'get', () => ({
  200: data,
  400: null,
}));
