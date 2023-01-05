import styled, { css } from 'styled-components';
import { useState } from 'react';
import checkIcon from '../../../assets/icons/albumPage/Check.png';
import PhotoDto from '../../../types/gallery/Photo.dto';

const PhotoBox = styled.div<{ isSelected: boolean; imgUrl: string }>`
  position: relative;
  margin: 3px;

  background: ${({ isSelected, imgUrl }) =>
    isSelected
      ? css`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imgUrl})`
      : css`url(${imgUrl})`};
  background-size: cover;

  filter: drop-shadow(0px 0px 4px rgba(151, 71, 255, 0.2));
  border-radius: 6px;

  aspect-ratio: 1/1;
  flex: 0 0 calc((100% / 3) - 6px);
`;

const CheckIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;

  padding: 7px 6px;

  width: 34px;
  height: 34px;

  flex-grow: 0;
  z-index: 4;
`;

type PhotoProps = {
  PhotoInfo: PhotoDto;
};

function Photo({ PhotoInfo }: PhotoProps) {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => {
    setIsSelected(!isSelected);
  };

  return (
    <PhotoBox
      key={PhotoInfo.id}
      onClick={clickHandler}
      isSelected={isSelected}
      imgUrl={PhotoInfo.url}
    >
      {isSelected && <CheckIcon src={checkIcon} alt="선택됨" />}
    </PhotoBox>
  );
}

export default Photo;
