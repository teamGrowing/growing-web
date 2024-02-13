import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoLineDto } from 'models/gallery';
import DataContext from '../../../../pages/gallery/context';
import * as S from './Photo.styled';

type PhotoProps = {
  photoInfo: PhotoLineDto;
};

function Photo({ photoInfo }: PhotoProps) {
  const navigate = useNavigate();
  const ctx = useContext(DataContext);
  const [isSelected, setIsSelected] = useState(false);
  const clickHandler = () => {
    if (!ctx.selectingAvailable) {
      if (ctx.data) {
        navigate(`photo/${photoInfo.i}`, {
          state: {
            title: ctx.data?.title,
            subTitle: ctx.data?.subTitle,
          },
        });
        return;
      }
      navigate(`/gallery/photo/${photoInfo.i}`);
      return;
    }
    if (isSelected) {
      ctx.removeFromList(photoInfo.i);
    } else {
      ctx.addToList(photoInfo.i, photoInfo.u);
    }
    setIsSelected((prevState) => !prevState);
  };

  useEffect(() => {
    if (!ctx.selectingAvailable) {
      setIsSelected(false);
    }
  }, [ctx.selectingAvailable]);

  return (
    <S.PhotoBox
      key={photoInfo.i}
      onClick={clickHandler}
      isSelected={isSelected}
      imgUrl={`${photoInfo.u}#t=0.5`}
    >
      {isSelected && <S.CheckIcon icon="IconCheck" themeColor="gray50" />}
    </S.PhotoBox>
  );
}

export default Photo;
