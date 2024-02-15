import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { ChatRequestDto, Notice } from 'models/chat';

type Params = {
  coupleId: string;
};

const data: Notice = {
  id: '1',
  content: '내일 10시 기상하기 ! ! ! !',
  announcer: '연쥬',
  isFolden: false,
};

export const getNoticesHandler = createApiHandler<
  Params,
  ChatRequestDto,
  NullableResponse<Notice>
>('/couples/:coupleId/chattings/notices', 'get', () => ({
  200: data,
  400: null,
}));
