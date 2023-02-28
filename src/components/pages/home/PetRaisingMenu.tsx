import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconBowl } from '../../../assets/icons/home/IconBowl.svg';
import { ReactComponent as IconSmile } from '../../../assets/icons/home/IconSmile.svg';
import { ReactComponent as IconLetter } from '../../../assets/icons/home/IconLetter.svg';
import { ReactComponent as IconHeart } from '../../../assets/icons/home/IconHeart.svg';

const Container = styled.div`
  width: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PetOptions = styled.div`
  padding: 0 5px;

  width: 100%;
  background-color: #ffffff70;
  box-shadow: 0px 4px 4px #0000003f;
  border-radius: 14px;
`;
const Border = styled.div`
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.gray400};
`;
const PetItem = styled.div`
  height: 62px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
  text-align: center;
`;

function PetRaisingMenu() {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Container>
      <IconHeart
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <PetOptions>
          <PetItem onClick={() => navigation('/pet/feed')}>
            <IconBowl />밥 주기
          </PetItem>
          <Border />
          <PetItem onClick={() => navigation('/pet/play')}>
            <IconSmile />
            쓰다듬기
          </PetItem>
          <Border />
          <PetItem onClick={() => navigation('/chat')}>
            <IconLetter />
            사랑해
            <br />
            하러가기
          </PetItem>
        </PetOptions>
      )}
    </Container>
  );
}

export default PetRaisingMenu;
