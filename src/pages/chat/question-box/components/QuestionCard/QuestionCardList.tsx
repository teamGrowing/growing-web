import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { useQuestionBoxData } from 'hooks/queries';
import * as S from './QuestionCardList.styled';
import QuestionCard from './QuestionCard';
import EmptyCard from './EmptyCard';

const QuestionCardList = () => {
  const { userStore } = store;

  const { data: QnAs } = useQuestionBoxData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.Questions>
      {!QnAs || !QnAs?.length ? (
        <EmptyCard />
      ) : (
        QnAs &&
        QnAs.map((QnA) => <QuestionCard key={QnA.question.id} {...QnA} />)
      )}
    </S.Questions>
  );
};

export default observer(QuestionCardList);
