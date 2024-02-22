import { createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoCommentDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

export const postCommentHandler = createApiHandler<
  Params,
  CreatePhotoCommentDto,
  null
>({
  path: '/couples/:coupleId/gallerys/photos/:photoId/comments/create',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
