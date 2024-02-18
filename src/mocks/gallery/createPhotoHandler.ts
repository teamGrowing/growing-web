import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoRequestDto } from 'models/chat';
import { CreatePhotoResponseDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

const data: CreatePhotoResponseDto = {
  photoId: 'photo-id',
};

export const createPhotoHandler = createApiHandler<
  Params,
  CreatePhotoRequestDto,
  NullableResponse<CreatePhotoResponseDto>
>('/couples/:coupleId/gallerys/photos/create', 'post', () => ({
  200: data,
  400: null,
}));
