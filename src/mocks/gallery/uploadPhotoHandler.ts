import { createApiHandler } from 'mocks/createApiHandler';

export const upLoadPhotoHandler = createApiHandler<{}, File, null>(
  '/photo-uploaded-url',
  'put',
  () => ({
    200: null,
    400: null,
  })
);
