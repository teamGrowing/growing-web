import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import store from '../../../../stores/RootStore';
import { EmojiPackageLineDto } from '../../../../types/user/EmojiPackageLine.dto';
import { CreateChattingDto } from '../../../../types/chat/createChat.dto';
import { useEmojiDetailData } from '../../../../hooks/queries/chat-emoji.queries';

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  justify-items: center;

  padding: 0 16px 32px;
`;

const StyledImg = styled.img`
  width: auto;
  max-width: 80px;
  height: auto;
  max-height: 80px;

  border-radius: 12px;
`;

interface InputChatProps extends Pick<EmojiPackageLineDto, 'id'> {
  createChat: (dto: CreateChattingDto) => void;
}

function Emojis({ createChat, id }: InputChatProps) {
  const { userStore } = store;

  const { data: emojis } = useEmojiDetailData({
    userId: userStore.user?.id ?? '',
    emojiId: id,
    options: {
      suspense: false,
    },
  });

  const handleClick = (emojiId: string) => {
    const dto: CreateChattingDto = {
      content: null,
      emojiId,
      imageIds: [],
      voiceMsgIds: [],
      userId: userStore.user?.id ?? '',
      coupleId: userStore.user?.coupleId ?? '',
    };
    createChat(dto);
  };

  return (
    <EmojiGrid>
      {emojis?.map((emoji) => (
        <StyledImg
          key={emoji.id}
          src={emoji.imageUrl}
          onClick={() => handleClick(emoji.id)}
        />
      ))}
    </EmojiGrid>
  );
}

export default observer(Emojis);
