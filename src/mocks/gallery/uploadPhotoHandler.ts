import { createApiHandler } from 'mocks/createApiHandler';

export const upLoadPhotoHandler = createApiHandler<{}, File, null>({
  path: '/photo-uploaded-url',
  method: 'put',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
