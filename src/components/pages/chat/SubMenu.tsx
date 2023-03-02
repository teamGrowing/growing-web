import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeInDown, fadeOutUp } from '../../../styles/common/keyframs';
import Icon from '../../common/Icon/Icon';

const SubMenuContainer = styled.div<{ openEnvelope: boolean }>`
  position: fixed;
  top: 49px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-evenly;

  animation: ${(props) => (props.openEnvelope ? fadeInDown : fadeOutUp)} 0.5s;
  visibility: ${(props) => (!props.openEnvelope ? 'hidden' : 'visible')};
  transition: visibility 0.5s linear;

  padding: 16px 32px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`;
const Item = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
`;

export default function SubMenu({ open }: { open: boolean }) {
  const navigation = useNavigate();

  return (
    <SubMenuContainer openEnvelope={open}>
      {/* TODO: 새 질문 표시 */}
      <Item onClick={() => navigation('/chat/question-box')}>
        <Icon icon="IconEnvelope" size={28} />
        질문 우편함
      </Item>
      <Item onClick={() => navigation('/chat/archive')}>
        <Icon icon="IconEnvelopePaper" size={28} />
        대화 보관함
      </Item>
      <Item onClick={() => navigation('/chat/photo-box')}>
        <Icon icon="IconGallery" size={28} />
        사진 모아보기
      </Item>
      <Item onClick={() => navigation('/chat/voice-box')}>
        <Icon icon="IconVoice" size={28} />
        음성 모아보기
      </Item>
    </SubMenuContainer>
  );
}
