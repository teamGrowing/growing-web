import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import usePhotos from 'pages/chat/hooks/usePhotos';
import { useGalleryList } from 'hooks/queries';
import { CreateChattingDto } from 'models/chat';
import VideoPlayBtn from '../../VideoPlayBtn/VideoPlayBtn';
import * as S from './PlusMenuGallery.styled';

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
      <S.ViewAllContainer onClick={(e) => e.stopPropagation()}>
        <TopBar
          title={`${getLength()}개가 선택되었습니다.`}
          leftNode={<Icon icon="IconExit" />}
          onLeftClick={() => chatStore.setChatMode({ mode: 'Default' })}
          rightMainNode={<div>전송</div>}
          onRightMainClick={handleSend}
        />

        <S.ScrollView className="hidden-scrollbar">
          <S.ViewAllPhotos>
            {photos?.map((photo) => (
              <S.PhotoContainer>
                <S.GridPhoto
                  key={photo.i}
                  url={photo.u}
                  onClick={() =>
                    updateId({ id: photo.i, isPhoto: photo.t === null })
                  }
                  isSelected={getSelected(photo.i)}
                >
                  <S.PhotoSelect isSelected={getSelected(photo.i)}>
                    {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
                  </S.PhotoSelect>
                  {photo.t && <VideoPlayBtn />}
                </S.GridPhoto>
              </S.PhotoContainer>
            ))}
          </S.ViewAllPhotos>
        </S.ScrollView>
      </S.ViewAllContainer>
    );
  }

  // 채팅창 하단 메뉴
  return (
    <S.PlusMenuGalleryContainer onClick={(e) => e.stopPropagation()}>
      <S.SendSection>
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
      </S.SendSection>

      <S.PhotoSection className="hidden-scrollbar">
        <S.Photos>
          {photos?.map((photo) => (
            <S.Photo
              key={photo.i}
              url={photo.u}
              onClick={() =>
                updateId({ id: photo.i, isPhoto: photo.t === null })
              }
              isSelected={getSelected(photo.i)}
            >
              <S.PhotoSelect isSelected={getSelected(photo.i)}>
                {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
              </S.PhotoSelect>
              {photo.t && <VideoPlayBtn />}
            </S.Photo>
          ))}
        </S.Photos>
      </S.PhotoSection>

      <S.FooterSection>
        <Icon
          icon="IconGrid"
          size={20}
          onClick={() => chatStore.setChatMode({ mode: 'GalleryAll' })}
        />
        <p className="text-gradient400">전체보기</p>
      </S.FooterSection>
    </S.PlusMenuGalleryContainer>
  );
}

export default observer(PlusMenuGallery);
