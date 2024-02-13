import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import { MENT_CHAT } from 'constants/ments';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import ArchivedCard from 'pages/chat/components/ArchivedCard/ArchivedCard';
import useToast from 'hooks/common/useToast';
import useDeleteArchived from 'pages/chat/hooks/useDeleteArchived';
import { useArchivedChatData } from 'hooks/queries';
import * as S from './ChatArchivePage.styled';

function ChatArchivePage() {
  const navigation = useNavigate();
  const { userStore } = store;
  const { addToast } = useToast();

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [popUpId, setPopUpId] = useState<string | null>(null);
  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: chats } = useArchivedChatData({
    coupleId: userStore.user?.coupleId,
  });

  const { updateId, clearIds, getSelected, deleteArchivedChats } =
    useDeleteArchived({
      coupleId: userStore.user?.coupleId ?? '',
    });

  const handleClick = (id: string) => {
    if (isSelectMode) {
      updateId(id).then((value) => {
        if (!value) setIsSelectMode(false);
      });
    } else {
      setPopUpId(id);
    }
  };

  useEffect(() => {
    if (!isSelectMode) clearIds();
  }, [isSelectMode]);

  return (
    <S.PageContainer className="page-container with-topbar">
      {!isSelectMode ? (
        <TopBar
          title="대화 보관함"
          leftNode={<Icon icon="IconArrowLeft" />}
          onLeftClick={() => navigation(-1)}
          rightMainNode={<Icon icon="IconCheck" />}
          onRightMainClick={() => setIsSelectMode(true)}
        />
      ) : (
        <TopBar
          title="삭제할 대화를 선택해주세요!"
          rightMainNode={<div>취소</div>}
          onRightMainClick={() => setIsSelectMode(false)}
          rightSubNode={<Icon icon="IconTrash" />}
          onRightSubClick={() => setOnModal(true)}
        />
      )}

      <S.Outer className="hidden-scrollbar">
        <S.Cards className="hidden-scrollbar">
          {!chats ? (
            <S.EmptyCase className="text-gradient400">
              <Icon icon="IconLogo" size={60} />
              {MENT_CHAT.ARCHIVED_EMPTY}
            </S.EmptyCase>
          ) : (
            chats
              .sort((a, b) => {
                return (
                  new Date(b.archivedAt).getTime() -
                  new Date(a.archivedAt).getTime()
                );
              })
              .map((chat, idx) => (
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
      </S.Outer>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_CHAT.ARCHIVED_DELELE}
        mainActionLabel="확인"
        onMainAction={() =>
          deleteArchivedChats().finally(() => {
            setIsSelectMode(false);
            addToast('삭제되었습니다.');
          })
        }
        subActionLabel="취소"
        onSubAction={() => setOnModal(false)}
      />
    </S.PageContainer>
  );
}

export default observer(ChatArchivePage);
