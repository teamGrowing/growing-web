import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as S from './NoticePage.styled';
import NoticeList from './components/NoticeList';

function NoticePage() {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <S.Container className="hidden-scrollbar">
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />

      <S.ListWrapper className="hidden-scrollbar">
        <ErrorBoundary onReset={reset} FallbackComponent={NoticeList.Error}>
          <Suspense fallback={<NoticeList.Loading />}>
            <NoticeList />
          </Suspense>
        </ErrorBoundary>
      </S.ListWrapper>
    </S.Container>
  );
}
export default NoticePage;
