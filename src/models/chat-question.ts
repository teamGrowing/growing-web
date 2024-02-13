export interface AnswerDto {
  content: string;
}

export interface IsToDoQuestion {
  result: boolean;
}

export interface QuestionsAndAnswers {
  question: {
    id: string;
    content: string;
    createdAt: Date;
  };
  myAnswer: {
    id: string;
    content: string;
    createdAt: Date;
  } | null;
  partnerAnswer: {
    id: string;
    content: string;
    createdAt: Date;
  } | null;
}
