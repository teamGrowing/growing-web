import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  photoId: string;
  commentId: string;
};

export const deleteCommentHandler = createApiHandler<Params, {}, null>(
  '/couples/:coupleId/gallerys/photos/:photoId/comments/:commentId',
  'delete',
  () => ({
    200: null,
    400: null,
  })
);
