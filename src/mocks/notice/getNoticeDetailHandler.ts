import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { NoticeDto } from 'models/more';

type Params = {
  noticeId: string;
};

const data: NoticeDto = {
  id: 1,
  title: '그로잉 출시',
  context: '드디어 출시되었습니다!',
  isDeleted: 1,
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
};

export const getNoticeDetailHandler = createApiHandler<
  Params,
  {},
  NullableResponse<NoticeDto>
>({
  path: '/notices/:noticeId',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
