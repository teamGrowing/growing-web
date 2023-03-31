import React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';
import store from '../../../../stores/RootStore';
import Icon from '../../../common/Icon/Icon';
import TopBar from '../../../common/TopBar/TopBar';
import usePhotos from '../../../../hooks/chat/usePhotos';
import { useGalleryList } from '../../../../hooks/queries/gallery.queries';
import { NAVBAR_HEIGHT } from '../../../../constants/constants';
import { CreateChattingDto } from '../../../../types/chat/createChat.dto';

// 전체보기
const ViewAllContainer = styled.div`
  z-index: 11;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: ${({ theme }) => theme.color.gray50};
`;

const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const ViewAllPhotos = styled.div`
  padding: ${NAVBAR_HEIGHT}px 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  justify-items: center;

  height: 100%;
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

// 하단 메뉴
const PlusMenuGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 780px;
  height: 314px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

const SendSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
`;

const PhotoSection = styled.section`
  flex: 1;

  display: flex;

  width: 100%;
  overflow-x: scroll;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

const Photos = styled.div`
  flex: 1;

  height: 100%;

  display: flex;
  padding-left: 2px;
  gap: 2px;

  width: max-content;
`;

const Photo = styled.div<{ url: string; isSelected: boolean }>`
  position: relative;

  width: 140px;

  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
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

const FooterSection = styled.section`
  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
  height: 52px;

  padding: 12px 16px 20px;

  > p {
    font-size: 14px;
  }
`;

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function PlusMenuGallery({ createChat }: InputChatProps) {
  const { userStore, chatStore } = store;

  const { data: photos } = useGalleryList({
    coupleId: userStore.user?.coupleId ?? '',
    options: {
      suspense: false,
    },
  });

  const {
    updateId,
    clearIds,
    getSelected,
    getIndex,
    getLength,
    sendGalleryPhotos,
  } = usePhotos({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const handleSend = async () => {
    const { imageIds, videoIds } = await sendGalleryPhotos();
    if (imageIds.length > 0) {
      const dto: CreateChattingDto = {
        content: null,
        emojiId: null,
        imageIds,
        voiceMsgIds: [],
        userId: userStore.user?.id ?? '',
        coupleId: userStore.user?.coupleId ?? '',
      };
      createChat(dto);
    }
    if (videoIds.length > 0) {
      // video는 한개씩 전송
      videoIds.map((id) => {
        const dto: CreateChattingDto = {
          content: null,
          emojiId: null,
          imageIds: [id],
          voiceMsgIds: [],
          userId: userStore.user?.id ?? '',
          coupleId: userStore.user?.coupleId ?? '',
        };
        return createChat(dto);
      });
    }

    chatStore.setChatMode({ mode: 'Default' });
  };

  // 전체보기
  if (chatStore.chatMode.mode === 'GalleryAll') {
    return (
      <ViewAllContainer>
        <TopBar
          title={`${getLength()}개가 선택되었습니다.`}
          leftNode={<Icon icon="IconExit" />}
          onLeftClick={() => chatStore.setChatMode({ mode: 'Default' })}
          rightMainNode={<div>전송</div>}
          onRightMainClick={handleSend}
        />

        <ScrollView className="hidden-scrollbar">
          <ViewAllPhotos>
            {photos?.map((photo) => (
              <PhotoContainer>
                <GridPhoto
                  key={photo.i}
                  url={photo.u}
                  onClick={() =>
                    updateId({ id: photo.i, isPhoto: photo.t === null })
                  }
                  isSelected={getSelected(photo.i)}
                >
                  <PhotoSelect isSelected={getSelected(photo.i)}>
                    {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
                  </PhotoSelect>
                </GridPhoto>
              </PhotoContainer>
            ))}
          </ViewAllPhotos>
        </ScrollView>
      </ViewAllContainer>
    );
  }

  // 채팅창 하단 메뉴
  return (
    <PlusMenuGalleryContainer>
      <SendSection>
        <Icon
          icon="IconArrowLeft"
          onClick={() => {
            clearIds();
            chatStore.setChatMode({ mode: 'Menu' });
          }}
        />
        {!!getLength() && (
          <Icon icon="IconArrowTopCircle" onClick={handleSend} />
        )}
      </SendSection>

      <PhotoSection className="hidden-scrollbar">
        <Photos>
          {photos?.map((photo) => (
            <Photo
              key={photo.i}
              url={photo.u}
              onClick={() =>
                updateId({ id: photo.i, isPhoto: photo.t === null })
              }
              isSelected={getSelected(photo.i)}
            >
              <PhotoSelect isSelected={getSelected(photo.i)}>
                {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
              </PhotoSelect>
            </Photo>
          ))}
        </Photos>
      </PhotoSection>

      <FooterSection>
        <Icon
          icon="IconGrid"
          size={20}
          onClick={() => chatStore.setChatMode({ mode: 'GalleryAll' })}
        />
        <p className="text-gradient400">전체보기</p>
      </FooterSection>
    </PlusMenuGalleryContainer>
  );
}

export default observer(PlusMenuGallery);
