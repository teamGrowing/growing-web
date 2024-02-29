import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import ArchivedCardList from './components/ArchivedCard/ArchivedCardList';
import * as S from './page.styled';

function ChatArchivePage() {
  const navigation = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [onDeleteModal, setOnDeleteModal] = useState<boolean>(false);

  return (
    <S.PageContainer>
      <TopBar
        title={isSelectMode ? '삭제할 대화를 선택해주세요!' : '대화 보관함'}
        leftNode={isSelectMode ? undefined : <Icon icon="IconArrowLeft" />}
        onLeftClick={isSelectMode ? undefined : () => navigation(-1)}
        rightMainNode={
          isSelectMode ? <div>취소</div> : <Icon icon="IconCheck" />
        }
        onRightMainClick={() => setIsSelectMode(!isSelectMode)}
        rightSubNode={isSelectMode ? <Icon icon="IconTrash" /> : undefined}
        onRightSubClick={
          isSelectMode ? () => setOnDeleteModal(true) : undefined
        }
      />

      <S.InnerContainer>
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ArchivedCardList.Error}
        >
          <Suspense fallback={<ArchivedCardList.Loading />}>
            <ArchivedCardList
              isSelectMode={isSelectMode}
              setIsSelectMode={setIsSelectMode}
              onDeleteModal={onDeleteModal}
              setOnDeleteModal={setOnDeleteModal}
            />
          </Suspense>
        </ErrorBoundary>
      </S.InnerContainer>
    </S.PageContainer>
  );
}

export default ChatArchivePage;
