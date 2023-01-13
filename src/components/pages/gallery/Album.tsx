import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import checkIcon from '../../../assets/icons/albumPage/Check.png';
import AlbumDto from '../../../types/gallery/Album.dto';
import DataContext from '../../../pages/gallery/context';

const AlbumBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px 8px 6px;
  gap: 10px;
  isolation: isolate;

  width: 104px;
  height: 148px;

  background: ${({ theme }) => theme.color.white};

  box-shadow: 0px 4px 10px rgba(151, 71, 255, 0.1);

  border: 1px solid ${({ theme }) => theme.color.purple200};

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;
const CoverBackground = styled.div<{ backgroundUrl: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  padding: 0px 8px;
  isolation: isolate;

  background: url(${(props) => props.backgroundUrl});

  color: ${({ theme }) => theme.color.gradient400};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
  z-index: 2;
`;

const Title = styled.div`
  position: absolute;
  width: 60px;
  height: 14px;
  left: calc(50% - 60px / 2);
  top: calc(50% - 14px / 2 - 0.5px);

  font-family: 'PretendardRegular';
  font-size: 12px;
  line-height: 17px;

  text-align: center;
  margin: auto 0;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const TitleBackground = styled.div`
  width: 72px;
  height: 27px;

  background: rgba(255, 255, 255, 0.5);
  filter: blur(2px);
  border-radius: 50px;
  text-align: center;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  z-index: 0;
`;

const Sticker = styled.div`
  position: absolute;
  width: 7.78px;
  height: 23.34px;
  left: 49.5px;
  top: -14.49px;

  background: ${({ theme }) => theme.color.purple400};
  transform: rotate(6.14deg);

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
`;

const Subtitle = styled.div`
  width: 100%;

  font-family: 'PretendardLight';
  font-size: 12px;
  line-height: 14px;
  text-align: right;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  z-index: 1;
`;

const ClickLayer = styled.div`
  padding: 4px;

  position: absolute;
  width: 104px;
  height: 148px;
  left: 0px;
  top: 0px;

  background: rgba(0, 0, 0, 0.4);

  z-index: 3;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;

  padding: 7px 6px;
  gap: 10px;

  width: 24px;
  height: 24px;

  flex-grow: 0;
  z-index: 4;
`;

interface AlbumProps {
  albumInfo: AlbumDto;
}

function Album({ albumInfo }: AlbumProps) {
  const ctx = useContext(DataContext);
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => {
    if (!ctx.selectingAvailable) {
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
    <AlbumBox onClick={clickHandler}>
      <Sticker />
      <CoverBackground backgroundUrl={albumInfo.imageUrl}>
        <TitleBackground />
        <Title>{albumInfo.title}</Title>
      </CoverBackground>
      <Subtitle>{albumInfo.subTitle}</Subtitle>
      {isSelected && <ClickLayer />}
      {isSelected && (
        <CheckIcon>
          <img src={checkIcon} alt="선택됨" />
        </CheckIcon>
      )}
    </AlbumBox>
  );
}

export default Album;
