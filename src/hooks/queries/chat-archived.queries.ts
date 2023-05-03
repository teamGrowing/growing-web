import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'constants/queryKeys';
import { UseMutationOptionsType, UseQueryOptionsType } from 'services';
import { CHAT_ARCHIVED_API } from 'services/chat.service';
import { ChattingArchivedDto } from 'types/chat/ChattingArchived.dto';

export function useArchivedChatData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string | null | undefined;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<ChattingArchivedDto[]>;
}) {
  return useQuery(
    [...queryKeys.chatKeys.archived, ...(storeCode ?? [])],
    () => CHAT_ARCHIVED_API.getArchivedChat(`${coupleId ?? ''}`),
    {
      select: (data) => data.data,
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
    ...options,
  });
}
