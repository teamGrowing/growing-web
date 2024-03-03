import { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import queryKeys from 'libs/react-query/queryKeys';
import usePhotos from 'pages/chat/hooks/usePhotos';
import { MENT_CHAT } from 'constants/ments';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';
import { ChatPhotoLineDto } from 'models/chat';
import useToast from 'hooks/common/useToast';
import * as S from './page.styled';
import PhotoList from './components/PhotoList/PhotoList';

function ChatPhotoBoxPage() {
  const { userStore } = store;
  const { addToast } = useToast();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [onModal, setOnModal] = useState<boolean>(false);

  const { updateId, getSelected, clearIds, getIndex, getLength, deleteChats } =
    usePhotos({
      coupleId: userStore.user?.coupleId ?? '',
    });

  const handleDelete = async () => {
    try {
      await deleteChats();
      addToast('삭제되었습니다');
    } catch (e) {
      //
    } finally {
      setIsSelectMode(false);
      queryClient.invalidateQueries(queryKeys.chatKeys.all);
      clearIds();
    }
  };

  const handleDeleteCancel = () => {
    clearIds();
    setIsSelectMode(false);
  };

  const handleOnDeleteModal = () => {
    if (getLength() === 0) {
      return;
    }
    setOnModal(true);
  };

  const handlePhotoClick = async (photo: ChatPhotoLineDto) => {
    if (isSelectMode) {
      try {
        const value = updateId({
          id: photo.i,
          isPhoto: photo.t === null,
        });
        if (!value) {
          setIsSelectMode(false);
        }
      } catch (e) {
        //
      }
      return;
    }
    navigation(`${photo.i}`);
  };

  useEffect(() => {
    if (!isSelectMode) {
      clearIds();
    }
  }, [isSelectMode]);

  return (
    <S.PageContainer>
      {!isSelectMode ? (
        <TopBar
          title="사진 모아보기"
          leftNode={<Icon icon="IconArrowLeft" />}
          onLeftClick={() => navigation(-1)}
          rightMainNode={<Icon icon="IconCheck" />}
          onRightMainClick={() => setIsSelectMode(true)}
        />
      ) : (
        <TopBar
          title="사진 모아보기"
          rightMainNode={<div>취소</div>}
          rightSubNode={<Icon icon="IconTrash" />}
          onRightMainClick={handleDeleteCancel}
          onRightSubClick={handleOnDeleteModal}
        />
      )}

      <TopbarInnerContainer className="hidden-scrollbar">
        <BlockErrorBoundary fallbackComponent={PhotoList.Error}>
          <Suspense fallback={<PhotoList.Loading />}>
            <PhotoList
              onPhotoClick={handlePhotoClick}
              getSelected={getSelected}
              isSelectMode={isSelectMode}
              getIndex={getIndex}
            />
          </Suspense>
        </BlockErrorBoundary>
      </TopbarInnerContainer>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_CHAT.PHOTOBOX_DELETE}
        mainActionLabel="확인"
        onMainAction={handleDelete}
        subActionLabel="취소"
        onSubAction={() => setOnModal(false)}
      />
    </S.PageContainer>
  );
}

export default observer(ChatPhotoBoxPage);
