import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from 'stores/RootStore';
import { MENT_CHAT } from 'constants/ments';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import ArchivedCard from 'components/pages/chat/ArchivedCard';
import useToast from 'hooks/common/useToast';
import useDeleteArchived from 'hooks/chat/useDeleteArchived';
import { useArchivedChatData } from 'hooks/queries/chat-archived.queries';

const PageContainer = styled.div`
  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.2) 7.3%,
    rgba(243, 129, 129, 0.2) 100%
  );
`;

const Outer = styled.div`
  display: block;

  height: 100%;
  overflow-y: scroll;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  grid-gap: 16px;
  justify-items: center;

  > :nth-child(2n + 1) {
    grid-row: span 2;
  }

  padding: 16px 16px 32px;

  height: 100%;
  overflow-y: scroll;
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
    <PageContainer className="page-container with-topbar">
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

      <Outer className="hidden-scrollbar">
        <Cards className="hidden-scrollbar">
          {!chats ? (
            <EmptyCase className="text-gradient400">
              <Icon icon="IconLogo" size={60} />
              {MENT_CHAT.ARCHIVED_EMPTY}
            </EmptyCase>
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
        </Cards>
      </Outer>

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
    </PageContainer>
  );
}

export default observer(ChatArchivePage);
