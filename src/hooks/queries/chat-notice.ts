import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'constants/queryKeys';
import {
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import { CHAT_NOTICE_API } from 'apis/chat';
import { Notice } from 'types/chat/Notice';
import { NoticeIsFolden } from 'types/chat/NoticeIsFolden';

export function useChatNoticeData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<Notice | null>;
}) {
  return useQuery(
    [...queryKeys.chatKeys.notice, ...(storeCode ?? [])],
    () => CHAT_NOTICE_API.getNotices(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useNotifyChatMutate({
  coupleId,
  chattingId,
  options,
}: {
  coupleId: string;
  chattingId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse<Notice>, AxiosError, unknown, unknown> {
  return useMutation({
    mutationFn: () => CHAT_NOTICE_API.postNotice(coupleId, chattingId),
    ...options,
  });
}

export function useFoldNoticeMutate({
  coupleId,
  noticeId,
  options,
}: {
  coupleId: string;
  noticeId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<
  AxiosResponse<NoticeIsFolden>,
  AxiosError,
  unknown,
  unknown
> {
  return useMutation({
    mutationFn: () => CHAT_NOTICE_API.postNoticeFold(coupleId, noticeId),
    ...options,
  });
}

export function useInvisibleNoticeMutate({
  coupleId,
  noticeId,
  options,
}: {
  coupleId: string;
  noticeId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, unknown, unknown> {
  return useMutation({
    mutationFn: () => CHAT_NOTICE_API.postNoticeInvisible(coupleId, noticeId),
    ...options,
  });
}
