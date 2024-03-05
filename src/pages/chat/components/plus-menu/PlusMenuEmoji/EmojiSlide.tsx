import React from 'react';
import { observer } from 'mobx-react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useEmojiData } from 'hooks/queries';
import { CreateChattingDto } from 'models/chat';
import store from 'stores/RootStore';
import Emojis from '../Emojis/Emojis';

interface Props {
  swiperElRef: React.MutableRefObject<SwiperRef | null>;
  setIsSelected: React.Dispatch<React.SetStateAction<number>>;
  createChat: (dto: CreateChattingDto) => void;
}

const EmojiSlide = ({ swiperElRef, setIsSelected, createChat }: Props) => {
  const { userStore } = store;

  const { data: emojiPacks } = useEmojiData({
    userId: userStore.user?.id ?? '',
  });

  return (
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
  );
};

export default observer(EmojiSlide);
