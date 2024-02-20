import { createApiHandler } from 'mocks/createApiHandler';

type Params = {
  coupleId: string;
  photoId: string;
  commentId: string;
};

export const deleteCommentHandler = createApiHandler<Params, {}, null>({
  path: '/couples/:coupleId/gallerys/photos/:photoId/comments/:commentId',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});
