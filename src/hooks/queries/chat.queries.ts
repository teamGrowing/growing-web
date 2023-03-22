import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType, UseMutationOptionsType } from '../../services';
import { CHAT_QNA_API } from '../../services/chat.service';
import { AnswerDto } from '../../types/chat/questions/Answer.dto';
import { IsToDoQuestion } from '../../types/chat/questions/IsToDoQuestion';
import { QuestionsAndAnswers } from '../../types/chat/questions/QuestionAndAnswers';

const useQuestionBoxData = ({
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

export default useQuestionBoxData;
