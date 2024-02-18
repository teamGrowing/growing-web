import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoRequestDto, GetUploadUrlResponseDto } from 'models/chat';

type Params = {
  coupleId: string;
};

const data: GetUploadUrlResponseDto = {
  url: 'url',
  s3Path: 's3Path',
};

export const createPhotoHandler = createApiHandler<
  Params,
  CreatePhotoRequestDto,
  NullableResponse<GetUploadUrlResponseDto>
>('/couples/:coupleId/gallerys/photos/create', 'post', () => ({
  200: data,
  400: null,
}));
