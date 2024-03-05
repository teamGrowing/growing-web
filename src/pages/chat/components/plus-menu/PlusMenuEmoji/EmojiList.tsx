import { Suspense, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import { CreateChattingDto } from 'models/chat';
import * as S from './EmojiList.styled';
import EmojiControlBar from './EmojiControlBar';
import EmojiSlide from './EmojiSlide';
import Emojis from '../Emojis/Emojis';

interface Props {
  createChat: (dto: CreateChattingDto) => void;
}

const EmojiList = ({ createChat }: Props) => {
  const swiperElRef = useRef<SwiperRef | null>(null);
  const [isSelected, setIsSelected] = useState<number>(0);

  const handleClick = (idx: number) => {
    swiperElRef.current?.swiper.slideTo(idx);
  };

  return (
    <>
      <S.SwiperControlbar>
        <BlockErrorBoundary fallbackComponent={EmojiControlBar.Error}>
          <Suspense fallback={<EmojiControlBar.Loading />}>
            <EmojiControlBar selectedIdx={isSelected} onClick={handleClick} />
          </Suspense>
        </BlockErrorBoundary>
      </S.SwiperControlbar>

      <BlockErrorBoundary fallbackComponent={Emojis.Error}>
        <Suspense fallback={<Emojis.Loading />}>
          <EmojiSlide
            swiperElRef={swiperElRef}
            setIsSelected={setIsSelected}
            createChat={createChat}
          />
        </Suspense>
      </BlockErrorBoundary>
    </>
  );
};

export default EmojiList;
