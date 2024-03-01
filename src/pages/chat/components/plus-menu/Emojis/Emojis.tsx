import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { EmojiPackageLineDto } from 'models/user';
import { CreateChattingDto } from 'models/chat';
import { useEmojiDetailData } from 'hooks/queries';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { MENT_COMMON } from 'constants/ments';
import * as S from './Emojis.styled';

interface InputChatProps extends Pick<EmojiPackageLineDto, 'id'> {
  createChat: (dto: CreateChattingDto) => void;
}

function Emojis({ createChat, id }: InputChatProps) {
  const { userStore } = store;

  const { data: emojis } = useEmojiDetailData({
    userId: userStore.user?.id ?? '',
    emojiId: id,
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

Emojis.Loading = () => {
  const skeletonArr = new Array(4).fill(null);

  return (
    <S.EmojiGrid>
      {skeletonArr.map((_, idx) => (
        <Skeleton
          key={idx}
          width={80}
          height={80}
          baseColor="rgba(252, 227, 138, 0.2)"
          highlightColor=" rgba(243, 129, 129, 0.2)"
          borderRadius={12}
        />
      ))}
    </S.EmojiGrid>
  );
};

Emojis.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <ErrorMessage>{MENT_COMMON.ERROR}</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(Emojis);
