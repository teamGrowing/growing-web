import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { ChatType } from '../../../stores/ChatStore';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';

const Container = styled.div`
  height: 260px;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

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

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

const Photos = styled.div`
  flex: 1;

  display: flex;
  padding-left: 2px;
  gap: 2px;
`;

const Photo = styled.div`
  position: relative;

  width: 140px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

const PhotoSelect = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;

  width: 16px;
  height: 16px;

  background-color: ${({ theme }) => theme.color.gray50};
  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 50%;
`;

const PhotoAll = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 12px 16px 20px;
`;

function PlusMenu() {
  const { chatStore } = store;
  const { mode } = chatStore.chatMode;

  const plusMenuProps: ChatType[] = [
    'Menu',
    'Gallery',
    'Camera',
    'Voice',
    'Map',
  ];

  if (!plusMenuProps.includes(mode)) {
    return null;
  }

  return (
    <Container>
      {chatStore.chatMode.mode === 'Menu' && (
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
          <Item onClick={() => chatStore.setChatMode({ mode: 'Voice' })}>
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
          </Item>
        </MenuContainer>
      )}

      {chatStore.chatMode.mode === 'Gallery' && (
        <GalleryContainer>
          <Photos>
            <Photo>
              <PhotoSelect />
            </Photo>
            <Photo>
              <PhotoSelect />
            </Photo>
            <Photo>
              <PhotoSelect />
            </Photo>
            <Photo>
              <PhotoSelect />
            </Photo>
          </Photos>
          <PhotoAll>
            <Icon icon="IconPlus" size={20} />
            <p className="text-gradient400">전체보기</p>
          </PhotoAll>
        </GalleryContainer>
      )}
    </Container>
  );
}

export default observer(PlusMenu);
