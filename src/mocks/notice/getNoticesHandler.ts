import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { NoticeDto } from 'models/more';

const data: NoticeDto[] = [
  {
    id: 1,
    title: '그로잉 출시',
    context: '드디어 출시되었습니다!',
    isDeleted: 1,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
  {
    id: 2,
    title: '시스템 점검',
    context: '시스템 점검 예정입니다',
    isDeleted: 1,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  },
];

export const getNoticesHandler = createApiHandler<
  {},
  {},
  NullableResponse<NoticeDto[]>
>({
  path: '/notices',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
