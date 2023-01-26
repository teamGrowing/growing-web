import styled, { css } from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoDto from '../../../types/gallery/Photo.dto';
import DataContext from '../../../pages/gallery/context';
import Icon from '../../common/Icon/Icon';

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

const CheckIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;

  flex-grow: 0;
  z-index: 4;
`;

type PhotoProps = {
  photoInfo: PhotoDto;
};

function Photo({ photoInfo }: PhotoProps) {
  const navigate = useNavigate();
  const ctx = useContext(DataContext);
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => {
    if (!ctx.selectingAvailable) {
      navigate(`/gallery/photo/${photoInfo.id}`, {
        state: {
          title: ctx.data?.title,
          subTitle: ctx.data?.subTitle,
        },
      });
      return;
    }
    if (isSelected) {
      ctx.removeFromList(photoInfo.id);
    } else {
      ctx.addToList(photoInfo.id);
    }
    setIsSelected((prevState) => !prevState);
  };

  useEffect(() => {
    if (!ctx.selectingAvailable) {
      setIsSelected(false);
    }
  }, [ctx.selectingAvailable]);

  return (
    <PhotoBox
      key={photoInfo.id}
      onClick={clickHandler}
      isSelected={isSelected}
      imgUrl={photoInfo.url}
    >
      {isSelected && <CheckIcon icon="IconCheck" themeColor="gray50" />}
    </PhotoBox>
  );
}

export default Photo;
