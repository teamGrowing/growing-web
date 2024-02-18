import { createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoCommentDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

export const postCommentHandler = createApiHandler<
  Params,
  CreatePhotoCommentDto,
  null
>(
  '/couples/:coupleId/gallerys/photos/:photoId/comments/create',
  'post',
  () => ({
    200: null,
    400: null,
  })
);
