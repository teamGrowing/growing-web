import { Suspense } from 'react';
import { observer } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import usePhotos from 'pages/chat/hooks/usePhotos';
import { CreateChattingDto } from 'models/chat';
import TopBar from 'components/common/TopBar/TopBar';
import * as S from './PlusMenuGallery.styled';
import PlusMenuPhotoList from '../PlusMenuPhotoList/PlusMenuPhotoList';
import PlusMenuBottomPhotoList from '../PlusMenuBottomPhotoList/PlusMenuBottomPhotoList';

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function PlusMenuGallery({ createChat }: InputChatProps) {
  const { userStore, chatStore } = store;
  const { reset } = useQueryErrorResetBoundary();

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
        <S.StyledTopbar>
          <TopBar
            title={`${getLength()}개가 선택되었습니다.`}
            leftNode={<Icon icon="IconExit" />}
            onLeftClick={() => chatStore.setChatMode({ mode: 'Default' })}
            rightMainNode={<div>전송</div>}
            onRightMainClick={handleSend}
          />
        </S.StyledTopbar>

        <S.ScrollView className="hidden-scrollbar">
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={PlusMenuPhotoList.Error}
          >
            <Suspense fallback={<PlusMenuPhotoList.Loading />}>
              <PlusMenuPhotoList
                updateId={updateId}
                getSelected={getSelected}
                getIndex={getIndex}
              />
            </Suspense>
          </ErrorBoundary>
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
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={PlusMenuBottomPhotoList.Error}
        >
          <Suspense fallback={<PlusMenuBottomPhotoList.Loading />}>
            <PlusMenuBottomPhotoList
              updateId={updateId}
              getSelected={getSelected}
              getIndex={getIndex}
            />
          </Suspense>
        </ErrorBoundary>
      </S.PhotoSection>

      <S.FooterSection>
        <S.AllViewButton
          onClick={() => chatStore.setChatMode({ mode: 'GalleryAll' })}
        >
          <Icon icon="IconGrid" size={18} />
          <p className="text-gradient400">전체보기</p>
        </S.AllViewButton>
      </S.FooterSection>
    </S.PlusMenuGalleryContainer>
  );
}

export default observer(PlusMenuGallery);
