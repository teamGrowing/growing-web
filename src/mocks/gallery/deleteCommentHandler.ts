import { createApiHandler } from 'mocks/createApiHandler';
import { commentsData } from './data/data';

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
  onSuccess: ({ commentId }) => {
    const comment = commentsData.find((c) => c.id === commentId);
    if (!comment) return;
    comment.isDeleted = true;
  },
});
