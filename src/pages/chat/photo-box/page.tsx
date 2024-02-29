import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import VideoPlayBtn from 'pages/chat/components/VideoPlayBtn/VideoPlayBtn';
import usePhotos from 'pages/chat/hooks/usePhotos';
import { useChatPhotoBoxData } from 'hooks/queries';
import { MENT_CHAT } from 'constants/ments';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';
import * as S from './page.styled';

function ChatPhotoBoxPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: photos } = useChatPhotoBoxData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const { updateId, getSelected, clearIds, getIndex, getLength, deleteChats } =
    usePhotos({
      coupleId: userStore.user?.coupleId ?? '',
    });

  const handleDelete = () => {
    deleteChats().finally(() => {
      setIsSelectMode(false);
      clearIds();
    });
  };

  useEffect(() => {
    if (!isSelectMode) clearIds();
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
          onRightMainClick={() => {
            clearIds();
            setIsSelectMode(false);
          }}
          onRightSubClick={() => {
            if (getLength() === 0) return;
            setOnModal(true);
          }}
        />
      )}

      <TopbarInnerContainer className="hidden-scrollbar">
        <S.ViewAllPhotos>
          {!photos ? (
            <S.EmptyCase className="text-gradient400">
              <Icon icon="IconLogo" size={60} />
              {MENT_CHAT.ARCHIVED_EMPTY}
            </S.EmptyCase>
          ) : (
            photos?.map((photo) => (
              <S.PhotoContainer key={photo.i}>
                <S.GridPhoto
                  url={photo.u[0]}
                  onClick={() => {
                    if (isSelectMode) {
                      return updateId({
                        id: photo.i,
                        isPhoto: photo.t === null,
                      }).then((value) => {
                        if (!value) setIsSelectMode(false);
                      });
                    }
                    return navigation(`${photo.i}`);
                  }}
                  isSelected={getSelected(photo.i)}
                >
                  {isSelectMode && (
                    <S.PhotoSelect isSelected={getSelected(photo.i)}>
                      {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
                    </S.PhotoSelect>
                  )}
                  {photo.u.length > 1 && (
                    <S.PhotoLengthLabel className="text-gradient400">
                      <Icon icon="IconGallery" size={13} />
                      {photo.u.length}
                    </S.PhotoLengthLabel>
                  )}
                  {photo.t && <VideoPlayBtn />}
                </S.GridPhoto>
              </S.PhotoContainer>
            ))
          )}
        </S.ViewAllPhotos>
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
