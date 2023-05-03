import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { ChatType } from '../../../../stores/ChatStore';
import store from '../../../../stores/RootStore';
import Icon from '../../../common/Icon/Icon';
import { CreateChattingDto } from '../../../../types/chat/createChat.dto';
import PlusMenuEmoji from './PlusMenuEmoji';

const Container = styled.div`
  width: 100%;
  height: 260px;
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  justify-items: center;

  padding: 16px 32px;

  background-color: ${({ theme }) => theme.color.white};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 10px 0;
  > p {
    font-size: 14px;
  }
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;

  background-color: ${({ theme }) => theme.color.gray100}cc;
  border-radius: 20px;
`;

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function PlusMenu({ createChat }: InputChatProps) {
  const { chatStore } = store;
  const { mode } = chatStore.chatMode;

  const plusMenuProps: ChatType[] = [
    'Menu',
    'Gallery',
    'Camera',
    'Voice',
    'Map',
    'Emoji',
  ];

  if (!plusMenuProps.includes(mode)) {
    return null;
  }

  if (mode === 'Emoji') {
    return <PlusMenuEmoji createChat={createChat} />;
  }

  return (
    <Container>
      {mode === 'Menu' && (
        <MenuContainer>
          <Item onClick={() => chatStore.setChatMode({ mode: 'Gallery' })}>
            <StyledIcon>
              <Icon icon="IconGallery" size={30} />
            </StyledIcon>
            <p className="text-gradient400">사진</p>
          </Item>
          <Item onClick={() => chatStore.setChatMode({ mode: 'Camera' })}>
            <StyledIcon>
              <Icon icon="IconCamera" size={30} />
            </StyledIcon>
            <p className="text-gradient400">카메라</p>
          </Item>
          {/* TODO */}
          {/* <Item onClick={() => chatStore.setChatMode({ mode: 'Voice' })}>
            <StyledIcon>
              <Icon icon="IconVoice" size={30} />
            </StyledIcon>
            <p className="text-gradient400">음성</p>
          </Item>
          <Item onClick={() => chatStore.setChatMode({ mode: 'Map' })}>
            <StyledIcon>
              <Icon icon="IconMap" size={30} />
            </StyledIcon>
            <p className="text-gradient400">지도</p>
          </Item> */}
        </MenuContainer>
      )}
    </Container>
  );
}

export default observer(PlusMenu);
