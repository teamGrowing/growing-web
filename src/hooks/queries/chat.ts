import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CHAT_LIMIT } from 'constants/constants';
import queryKeys from 'libs/react-query/queryKeys';
import {
  UseQueryOptionsType,
  UseMutationOptionsType,
  UseInfiniteQueryOptionsType,
} from 'types/CustomReactQuery';
import { CHAT_API, CHAT_QNA_API } from 'apis/chat';
import { ParentChildChattingDto } from 'models/chat';
import {
  AnswerDto,
  IsToDoQuestion,
  QuestionsAndAnswers,
} from 'models/chat-question';
import { throttle } from 'lodash';

const throttledGetChats = throttle(
  (coupleId, { base, limit, offset }, onSuccess) => {
    CHAT_API.getChats(coupleId, { base, limit, offset }).then(onSuccess);
  },
  1000
);

export const useChatData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: Omit<
    UseInfiniteQueryOptionsType<ParentChildChattingDto[]>,
    'queryKey' | 'queryFn'
  >;
}) =>
  useInfiniteQuery(
    [...queryKeys.chatKeys.all, ...(storeCode ?? [])],
    ({ pageParam = 0 }) =>
      new Promise((resolve) => {
        throttledGetChats(
          coupleId,
          {
            base: pageParam,
            limit: CHAT_LIMIT,
            offset: 0,
          },
          resolve
        );
      }),
    {
      getNextPageParam: (res, allPages) => {
        if (res.data.length === 0 || res.data.length < CHAT_LIMIT) {
          return undefined;
        }
        return allPages.length * CHAT_LIMIT;
      },
      select: (data) => ({
        pages: [...data.pages]
          .map((res) =>
            res.data.sort(
              (a, b) =>
                new Date(a.parentChatting.createdAt).getTime() -
                new Date(b.parentChatting.createdAt).getTime()
            )
          )
          .reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
      refetchOnWindowFocus: false,
      ...options,
    }
  );

export const useQuestionBoxData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<QuestionsAndAnswers[]>;
}) =>
  useQuery(
    [...queryKeys.qnaKeys.all, ...(storeCode ?? [])],
    () => CHAT_QNA_API.getQuestions(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useHasQuestionData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<IsToDoQuestion>;
}) =>
  useQuery(
    [...queryKeys.qnaKeys.hasTodo, ...(storeCode ?? [])],
    () => CHAT_QNA_API.getHasToDoQuestions(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export function useAnswerMutation({
  coupleId,
  questionId,
  options,
}: {
  coupleId: string;
  questionId: string;
  options?: UseMutationOptionsType<AnswerDto>;
}): UseMutationResult<AxiosResponse, AxiosError, AnswerDto, unknown> {
  return useMutation({
    mutationFn: (dto: AnswerDto) =>
      CHAT_QNA_API.postQuestions(coupleId, questionId, dto),
    ...options,
  });
}

export function useOurChatDelete({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  return useMutation({
    mutationFn: (chattingId: string) =>
      CHAT_API.deleteOurChat(coupleId, chattingId),
    ...options,
  });
}

export function useMyChatDelete({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  return useMutation({
    mutationFn: (chattingId: string) =>
      CHAT_API.deleteMyChat(coupleId, chattingId),
    ...options,
  });
}
