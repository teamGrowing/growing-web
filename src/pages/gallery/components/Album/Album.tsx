import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlbumDto } from 'models/gallery';
import Icon from 'components/common/Icon/Icon';
import DataContext from '../../context';
import * as S from './Album.styled';

interface AlbumProps {
  albumInfo: AlbumDto;
}

function Album({ albumInfo }: AlbumProps) {
  const ctx = useContext(DataContext);
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const clickHandler = () => {
    if (!ctx.selectingAvailable) {
      navigate(`/gallery/album/${albumInfo.id}`, {
        state: {
          title: albumInfo.title,
          subTitle: albumInfo.subTitle,
        },
      });
      return;
    }
    if (isSelected) {
      ctx.removeFromList(albumInfo.id);
    } else {
      ctx.addToList(albumInfo.id);
    }
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    if (!ctx.selectingAvailable) {
      setIsSelected(false);
    }
  }, [ctx.selectingAvailable]);

  return (
    <S.AlbumBox onClick={clickHandler}>
      <S.Sticker />
      <S.CoverBackground backgroundUrl={albumInfo.imageUrl}>
        <S.TitleBackground />
        <S.Title>{albumInfo.title}</S.Title>
      </S.CoverBackground>
      <S.Subtitle>{albumInfo.subTitle}</S.Subtitle>
      {isSelected && <S.ClickLayer />}
      {isSelected && (
        <S.CheckIcon>
          <Icon icon="IconCheck" themeColor="gray50" />
        </S.CheckIcon>
      )}
    </S.AlbumBox>
  );
}

export default Album;
