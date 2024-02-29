import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import store from 'stores/RootStore';
import { useQuestionBoxData } from 'hooks/queries';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { MENT_COMMON } from 'constants/ments';
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

QuestionCardList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <ErrorMessage>{MENT_COMMON.ERROR}</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(QuestionCardList);
