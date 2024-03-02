import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './page.styled';
import NoticeList from './components/NoticeList';

const NoticePage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <S.InnerContainer>
        <S.ListWrapper className="hidden-scrollbar">
          <BlockErrorBoundary fallbackComponent={NoticeList.Error}>
            <Suspense fallback={<NoticeList.Loading />}>
              <NoticeList />
            </Suspense>
          </BlockErrorBoundary>
        </S.ListWrapper>
      </S.InnerContainer>
    </S.Container>
  );
};
export default NoticePage;
