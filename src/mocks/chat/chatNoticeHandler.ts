import { Notice, NoticeIsFolden } from 'models/chat';
import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { findChatData } from './chatHandler';

let noticeData: Notice | null = {
  id: findChatData('1').id,
  content: findChatData('1').content ?? '',
  announcer: findChatData('1').Writer.name,
  isFolden: false,
};

type NoticeGetParams = {
  coupleId: string;
};

export const getNoticesHandler = createApiHandler<
  NoticeGetParams,
  {},
  NullableResponse<Notice>
>({
  path: '/couples/:coupleId/chattings/notices',
  method: 'get',
  requestHandler: () => ({
    200: noticeData,
    400: null,
  }),
});

type NoticePostParams = {
  coupleId: string;
  chattingId: string;
};

export const postNoticeHandler = createApiHandler<NoticePostParams, {}, null>({
  path: '/couples/:coupleId/chattings/:chattingId/notify',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ chattingId }) => {
    noticeData = {
      id: findChatData(chattingId).id,
      content: findChatData(chattingId).content ?? '',
      announcer: findChatData(chattingId).Writer.name,
      isFolden: false,
    };
  },
});

type NoticeFoldParams = {
  coupleId: string;
  noticeId: string;
};

export const postNoticeFoldHandler = createApiHandler<
  NoticeFoldParams,
  NoticeIsFolden,
  null
>({
  path: '/couples/:coupleId/chattings/notices/:noticeId/fold',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ noticeId }) => {
    const origin = noticeData;

    noticeData = {
      id: findChatData(noticeId).id,
      content: findChatData(noticeId).content ?? '',
      announcer: findChatData(noticeId).Writer.name,
      isFolden: !origin?.isFolden,
    };
  },
});

export const postNoticeInvisibleHandler = createApiHandler<
  NoticeFoldParams,
  {},
  null
>({
  path: '/couples/:coupleId/chattings/notices/:noticeId/invisible',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: () => {
    noticeData = null;
  },
});
