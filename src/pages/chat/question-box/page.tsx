import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import QuestionCardList from './components/QuestionCard/QuestionCardList';
import * as S from './page.styled';

function QuestionBoxPage() {
  const navigation = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <S.PageContainer>
      <TopBar
        title="질문 우편함"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
      />

      <S.InnerContainer>
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={QuestionCardList.Error}
        >
          <Suspense fallback={<QuestionCardList.Loading />}>
            <QuestionCardList />
          </Suspense>
        </ErrorBoundary>
      </S.InnerContainer>
    </S.PageContainer>
  );
}

export default QuestionBoxPage;
