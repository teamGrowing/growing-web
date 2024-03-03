import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import QuestionCardList from './components/QuestionCard/QuestionCardList';
import * as S from './page.styled';

function QuestionBoxPage() {
  const navigation = useNavigate();

  return (
    <S.PageContainer>
      <TopBar
        title="질문 우편함"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
      />

      <S.InnerContainer>
        <BlockErrorBoundary fallbackComponent={QuestionCardList.Error}>
          <Suspense fallback={<QuestionCardList.Loading />}>
            <QuestionCardList />
          </Suspense>
        </BlockErrorBoundary>
      </S.InnerContainer>
    </S.PageContainer>
  );
}

export default QuestionBoxPage;
