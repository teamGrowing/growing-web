import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import store from 'stores/RootStore';
import { useQuestionBoxData } from 'hooks/queries';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
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

QuestionCardList.Loading = () => {
  return (
    <S.Questions>
      <Skeleton height={62} borderRadius={20} />
      <Skeleton height={62} borderRadius={20} />
    </S.Questions>
  );
};

QuestionCardList.Error = (props: FallbackProps) => {
  return (
    <BlockErrorFallback.Common containerStyle={{ height: '100%' }} {...props} />
  );
};

export default observer(QuestionCardList);
