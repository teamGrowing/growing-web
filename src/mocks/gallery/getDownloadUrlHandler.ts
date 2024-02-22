import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { GetDownloadUrlResponseDto } from 'models/chat';

type Params = {
  coupleId: string;
  photoId: string;
};

const data: GetDownloadUrlResponseDto = {
  url: 'download-url',
};

export const getDownloadUrlHandler = createApiHandler<
  Params,
  {},
  NullableResponse<GetDownloadUrlResponseDto>
>({
  path: '/couples/:coupleId/gallerys/photos/:photoId/get-download-url',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
