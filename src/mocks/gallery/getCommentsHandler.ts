import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoCommentDto } from 'models/gallery';

type Params = {
  coupleId: string;
  photoId: string;
};

const data: PhotoCommentDto[] = [
  {
    id: '1',
    content: '대박',
    createdAt: new Date().toUTCString(),
    name: '민지',
    isMine: false,
  },
  {
    id: '2',
    content: 'ㅎㅎ',
    createdAt: new Date().toUTCString(),
    name: '연주',
    isMine: true,
  },
  {
    id: '3',
    content: '멋있어요 ~~ ',
    createdAt: new Date().toUTCString(),
    name: '민지',
    isMine: false,
  },
];

export const getCommentsHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoCommentDto[]>
>('/couples/:coupleId/gallerys/photos/:photoId/comments', 'get', () => ({
  200: data,
  400: null,
}));
