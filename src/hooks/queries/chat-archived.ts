import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'libs/react-query/queryKeys';
import {
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import { CHAT_ARCHIVED_API } from 'apis/chat';
import { ChattingArchivedDto } from 'models/chat';

export function useArchivedChatData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<ChattingArchivedDto[]>;
}) {
  return useQuery(
    [...queryKeys.chatKeys.archived, ...(storeCode ?? [])],
    () => CHAT_ARCHIVED_API.getArchivedChat(coupleId),
    {
      select: (data) =>
        data.data.sort((a, b) => {
          return (
            new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime()
          );
        }),
      ...options,
    }
  );
}

export function useArchivedChatMutate({
  coupleId,
  chattingId,
  options,
}: {
  coupleId: string;
  chattingId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<
  AxiosResponse<ChattingArchivedDto>,
  AxiosError,
  unknown,
  unknown
> {
  return useMutation({
    mutationFn: () => CHAT_ARCHIVED_API.postArchivedChat(coupleId, chattingId),
    useErrorBoundary: false,
    ...options,
  });
}

export function useArchivedChatDelete({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  return useMutation({
    mutationFn: (chattingId: string) =>
      CHAT_ARCHIVED_API.deleteArchivedChat(coupleId, chattingId),
    useErrorBoundary: false,
    ...options,
  });
}
