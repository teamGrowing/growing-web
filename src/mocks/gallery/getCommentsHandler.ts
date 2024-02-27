import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoCommentDto } from 'models/gallery';
import { commentsData } from './data/data';

type Params = {
  coupleId: string;
  photoId: string;
};

export const getCommentsHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoCommentDto[]>
>({
  path: '/couples/:coupleId/gallerys/photos/:photoId/comments',
  method: 'get',
  requestHandler: () => ({
    200: commentsData.map(({ isDeleted, ...rest }) => rest),
    400: null,
  }),
});
