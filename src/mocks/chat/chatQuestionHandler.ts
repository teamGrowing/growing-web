import { v4 as uuidv4 } from 'uuid';
import {
  NullableResponse,
  createApiHandler,
  getSearchParams,
} from 'mocks/createApiHandler';
import {
  AnswerDto,
  IsToDoQuestion,
  QuestionsAndAnswers,
} from 'models/chat-question';

let qnaData: QuestionsAndAnswers[] = [
  {
    question: {
      id: uuidv4(),
      content: '배고픈가욤',
      createdAt: new Date('2024.02.15'),
    },
    myAnswer: null,
    partnerAnswer: {
      id: uuidv4(),
      content: '네!',
      createdAt: new Date('2024.02.15'),
    },
  },
  {
    question: {
      id: uuidv4(),
      content: '가장 처음 만난 날! 상대방의 첫인상은 어땠나요?',
      createdAt: new Date('2024.02.14'),
    },
    myAnswer: {
      id: uuidv4(),
      content: '너무 멋있었어요~',
      createdAt: new Date('2024.02.14'),
    },
    partnerAnswer: {
      id: uuidv4(),
      content: '너무 재밌었답니당',
      createdAt: new Date('2024.02.14'),
    },
  },
];

const toDoData: IsToDoQuestion = {
  result: true,
};

const getDataByType = (isToDo: boolean) => (isToDo ? toDoData : qnaData);

type GetParams = {
  coupleId: string;
};

export const getQuestionsHandler = createApiHandler<
  GetParams,
  {},
  NullableResponse<QuestionsAndAnswers[] | IsToDoQuestion>
>('/couples/:coupleId/questions', 'get', (_, req) => {
  const isToDo = getSearchParams(req.url).get('to-do') === 'true';
  return {
    200: getDataByType(isToDo),
    400: null,
  };
});

type PostParams = {
  coupleId: string;
  questionId: string;
};

export const postQuestionsHandler = createApiHandler<
  PostParams,
  AnswerDto,
  NullableResponse<QuestionsAndAnswers>
>(
  '/couples/:coupleId/questions/:questionId/answer',
  'post',
  () => ({
    200: null,
    400: null,
  }),
  async ({ questionId }, req) => {
    const { content } = await req.json();
    qnaData = qnaData.map((qna) =>
      qna.question.id === questionId
        ? {
            ...qna,
            myAnswer: { id: uuidv4(), content, createdAt: new Date() },
          }
        : qna
    );
  }
);
