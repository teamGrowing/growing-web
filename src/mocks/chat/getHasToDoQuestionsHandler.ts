import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { IsToDoQuestion } from 'models/chat-question';

type Params = {
  coupleId: string;
};

const data: IsToDoQuestion = {
  result: false,
};

export const getHasToDoQuestionsHandler = createApiHandler<
  Params,
  {},
  NullableResponse<IsToDoQuestion>
>('/couples/:coupleId/questions?to-do=false', 'get', () => ({
  200: data,
  400: null,
}));
