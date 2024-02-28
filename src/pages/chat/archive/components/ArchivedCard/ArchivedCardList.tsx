import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Modal from 'components/common/Modal/Modal';
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
    coupleId: userStore.user?.coupleId,
  });

  const { updateId, clearIds, getSelected, deleteArchivedChats } =
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
    try {
      await deleteArchivedChats();
    } catch (e) {
      //
    } finally {
      setIsSelectMode(false);
      addToast('삭제되었습니다.');
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
        {!chats ? (
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

export default observer(ArchivedCardList);
