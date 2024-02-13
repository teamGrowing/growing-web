import { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import store from 'stores/RootStore';
import { useEmojiData } from 'hooks/queries';
import { CreateChattingDto } from 'types/chat/createChat.dto';
import { ImgEmojiBear, ImgEmojiCat, ImgEmojiRabbit } from 'assets/image';
import Emojis from '../Emojis/Emojis';
import * as S from './PlusMenuEmoji.styled';

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function PlusMenuEmoji({ createChat }: InputChatProps) {
  const { userStore } = store;

  const swiperElRef = useRef<SwiperRef | null>(null);
  const [isSelected, setIsSelected] = useState<number>(0);

  const { data: emojiPacks } = useEmojiData({
    userId: userStore.user?.id ?? '',
    options: {
      suspense: false,
    },
  });

  const handleClick = (idx: number) => {
    swiperElRef.current?.swiper.slideTo(idx);
  };

  // TODO: db에서 받아오도록
  function getThumbnail(name: string) {
    switch (name) {
      case 'growing-bear':
        return ImgEmojiBear;
      case 'growing-cat':
        return ImgEmojiCat;
      case 'growing-rabbit':
        return ImgEmojiRabbit;
      default:
        return ImgEmojiBear;
    }
  }

  return (
    <S.Container className="hidden-scrollbar">
      <S.SwiperControlbar>
        {emojiPacks?.map((emojiPack, idx) => (
          <S.StyledImg
            key={emojiPack.id}
            src={getThumbnail(emojiPack.name)}
            isActive={isSelected === idx}
            onClick={() => handleClick(idx)}
          />
        ))}
      </S.SwiperControlbar>

      <Swiper
        ref={swiperElRef}
        onSlideChange={(swiper) => setIsSelected(swiper.realIndex)}
      >
        {emojiPacks?.map((emojiPack) => (
          <SwiperSlide key={emojiPack.id}>
            <Emojis {...emojiPack} createChat={createChat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.Container>
  );
}

export default observer(PlusMenuEmoji);
