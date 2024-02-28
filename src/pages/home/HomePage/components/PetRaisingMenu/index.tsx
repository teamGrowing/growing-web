import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconBowl } from 'assets/icons/home/IconBowl.svg';
import { ReactComponent as IconSmile } from 'assets/icons/home/IconSmile.svg';
import { ReactComponent as IconLetter } from 'assets/icons/home/IconLetter.svg';
import { ImgHeart } from 'assets/image';
import * as S from './PetRaisingMenu.styled';

const PetRaisingMenu = () => {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <S.Container>
      <S.HeartButton
        src={ImgHeart}
        alt="heart_button"
        width={50}
        height={50}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      />

      {isOpen && (
        <S.PetOptions>
          <S.PetItem onClick={() => navigation('/pet/feed')}>
            <IconBowl />밥 주기
          </S.PetItem>

          <S.Border />

          <S.PetItem onClick={() => navigation('/pet/play')}>
            <IconSmile />
            쓰다듬기
          </S.PetItem>

          <S.Border />

          <S.PetItem onClick={() => navigation('/chat')}>
            <IconLetter />
            사랑해
            <br />
            하러가기
          </S.PetItem>
        </S.PetOptions>
      )}
    </S.Container>
  );
};

export default PetRaisingMenu;
