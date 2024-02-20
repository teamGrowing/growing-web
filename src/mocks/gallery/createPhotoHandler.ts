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
>({
  path: '/couples/:coupleId/gallerys/photos/create',
  method: 'post',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
