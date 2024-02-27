import { createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoCommentDto } from 'models/gallery';
import { v4 as uuidv4 } from 'uuid';
import { commentsData } from './data/data';

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
  onSuccess: async (_, req) => {
    const body = await req.json();
    commentsData.push({
      isDeleted: false,
      id: uuidv4(),
      content: body.content,
      createdAt: new Date().toUTCString(),
      name: '연주',
      isMine: false,
    });
  },
});
