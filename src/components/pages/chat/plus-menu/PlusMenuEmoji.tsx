import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import store from 'stores/RootStore';
import { useEmojiData } from 'hooks/queries';
import { CreateChattingDto } from 'types/chat/createChat.dto';
import { ImgEmojiBear, ImgEmojiCat, ImgEmojiRabbit } from 'assets/image';
import Emojis from './Emojis';

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 260px;
  overflow-y: scroll;
`;

const SwiperControlbar = styled.div`
  z-index: 2;

  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  gap: 10px;

  padding: 0 16px 8px;

  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray50};
`;

const StyledImg = styled.img<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  /* FIXME: safari에서 작동잘안함 */
  filter: ${(props) => (props.isActive ? 'grayscale(0)' : 'grayscale(1)')};
`;

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
    <Container className="hidden-scrollbar">
      <SwiperControlbar>
        {emojiPacks?.map((emojiPack, idx) => (
          <StyledImg
            key={emojiPack.id}
            src={getThumbnail(emojiPack.name)}
            isActive={isSelected === idx}
            onClick={() => handleClick(idx)}
          />
        ))}
      </SwiperControlbar>

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
    </Container>
  );
}

export default observer(PlusMenuEmoji);
