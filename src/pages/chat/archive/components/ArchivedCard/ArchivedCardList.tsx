import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { FallbackProps } from 'react-error-boundary';
import Modal from 'components/common/Modal/Modal';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import useToast from 'hooks/common/useToast';
import { MENT_CHAT } from 'constants/ments';
import store from 'stores/RootStore';
import { useArchivedChatData } from 'hooks/queries';
import useDeleteArchived from 'pages/chat/archive/hooks/useDeleteArchived';
import ArchivedCard from './ArchivedCard';
import * as S from './ArchivedCardList.styled';
import EmptyCard from './EmptyCard';

interface Props {
  isSelectMode: boolean;
  setIsSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteModal: boolean;
  setOnDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArchivedCardList = ({
  isSelectMode,
  setIsSelectMode,
  onDeleteModal,
  setOnDeleteModal,
}: Props) => {
  const { userStore } = store;
  const { addToast } = useToast();

  const [popUpId, setPopUpId] = useState<string | null>(null);

  const { data: chats } = useArchivedChatData({
    coupleId: userStore.user?.coupleId || '',
    options: {
      enabled: !!userStore.user?.coupleId,
    },
  });

  const { ids, updateId, clearIds, getSelected, deleteArchivedChats } =
    useDeleteArchived({
      coupleId: userStore.user?.coupleId ?? '',
    });

  const handleClick = async (id: string) => {
    if (isSelectMode) {
      try {
        const value = await updateId(id);
        if (!value) {
          setIsSelectMode(false);
        }
      } catch (e) {
        //
      }
    } else {
      setPopUpId(id);
    }
  };

  const handleDelete = async () => {
    if (!ids.length) {
      setIsSelectMode(false);
      return;
    }

    try {
      await deleteArchivedChats();
      addToast('삭제되었습니다.');
    } catch (e) {
      addToast('삭제하는 데 실패했습니다. 이용에 불편을 드려 죄송합니다 😭');
    } finally {
      setIsSelectMode(false);
    }
  };

  useEffect(() => {
    if (!isSelectMode) {
      clearIds();
    }
  }, [isSelectMode]);

  return (
    <>
      <S.Cards className="hidden-scrollbar">
        {!chats || !chats.length ? (
          <EmptyCard />
        ) : (
          chats.map((chat, idx) => (
            <ArchivedCard
              key={chat.chattingId}
              onClick={() => handleClick(chat.chattingId)}
              isSelected={getSelected(chat.chattingId)}
              isPopUp={popUpId === chat.chattingId}
              setPopUpId={setPopUpId}
              idx={idx}
              {...chat}
            />
          ))
        )}
      </S.Cards>

      <Modal
        onModal={onDeleteModal}
        setOnModal={setOnDeleteModal}
        description={MENT_CHAT.ARCHIVED_DELELE}
        mainActionLabel="확인"
        onMainAction={handleDelete}
        subActionLabel="취소"
        onSubAction={() => setOnDeleteModal(false)}
      />
    </>
  );
};

ArchivedCardList.Loading = () => {
  return (
    <S.LoadingContainer>
      <S.SkeletonWrapper>
        <S.StyledSkeleton height={316} borderRadius={10} />
      </S.SkeletonWrapper>
      <S.SkeletonWrapper>
        <S.StyledSkeleton height={150} borderRadius={10} />
      </S.SkeletonWrapper>
    </S.LoadingContainer>
  );
};

ArchivedCardList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <ErrorMessage>일시적인 오류로 불러오지 못했어요.</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>다시 불러오기</ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(ArchivedCardList);
