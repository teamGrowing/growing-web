import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import VideoPlayBtn from 'components/pages/chat/VideoPlayBtn';
import usePhotos from 'hooks/chat/usePhotos';
import { useChatPhotoBoxData } from 'hooks/queries/chat-photo.queries';
import { MENT_CHAT } from 'constants/ments';

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
`;

const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const ViewAllPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  justify-items: center;

  width: 100%;
`;

const EmptyCase = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  font-family: 'PretendardMedium';
  font-size: 19px;
`;

const PhotoContainer = styled.div`
  width: 100%;
  position: relative;

  ::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
`;

const GridPhoto = styled.div<{ url: string; isSelected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  opacity: ${(props) => props.isSelected && '0.5'};

  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid ${({ theme }) => theme.color.purple600};
    `};
`;

const PhotoSelect = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 6px;
  right: 6px;

  width: 20px;
  height: 20px;

  background: ${(props) =>
    props.isSelected
      ? props.theme.color.gradient400
      : props.theme.color.gray50};

  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 50%;

  font-size: 12px;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
`;

const PhotoLengthLabel = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;

  display: flex;
  align-items: center;
  gap: 2px;

  font-size: 12px;
`;

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
    <PageContainer className="page-container with-topbar">
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

      <ScrollView className="hidden-scrollbar">
        <ViewAllPhotos>
          {!photos ? (
            <EmptyCase className="text-gradient400">
              <Icon icon="IconLogo" size={60} />
              {MENT_CHAT.ARCHIVED_EMPTY}
            </EmptyCase>
          ) : (
            photos?.map((photo) => (
              <PhotoContainer key={photo.i}>
                <GridPhoto
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
                    <PhotoSelect isSelected={getSelected(photo.i)}>
                      {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
                    </PhotoSelect>
                  )}
                  {photo.u.length > 1 && (
                    <PhotoLengthLabel className="text-gradient400">
                      <Icon icon="IconGallery" size={13} />
                      {photo.u.length}
                    </PhotoLengthLabel>
                  )}
                  {photo.t && <VideoPlayBtn />}
                </GridPhoto>
              </PhotoContainer>
            ))
          )}
        </ViewAllPhotos>
      </ScrollView>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_CHAT.PHOTOBOX_DELETE}
        mainActionLabel="확인"
        onMainAction={handleDelete}
        subActionLabel="취소"
        onSubAction={() => setOnModal(false)}
      />
    </PageContainer>
  );
}

export default observer(ChatPhotoBoxPage);
