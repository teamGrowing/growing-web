import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { EmojiPackageLineDto } from 'types/user/EmojiPackageLine.dto';
import { CreateChattingDto } from 'types/chat/createChat.dto';
import { useEmojiDetailData } from 'hooks/queries';
import * as S from './Emojis.styled';

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
    <S.EmojiGrid>
      {emojis?.map((emoji) => (
        <S.StyledImg
          key={emoji.id}
          src={emoji.imageUrl}
          onClick={() => handleClick(emoji.id)}
        />
      ))}
    </S.EmojiGrid>
  );
}

export default observer(Emojis);
