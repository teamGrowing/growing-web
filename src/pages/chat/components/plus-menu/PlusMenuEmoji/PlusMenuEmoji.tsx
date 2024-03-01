import { Suspense } from 'react';
import { CreateChattingDto } from 'models/chat';
import * as S from './PlusMenuEmoji.styled';
import EmojiList from './EmojiList';

interface Props {
  createChat: (dto: CreateChattingDto) => void;
}

function PlusMenuEmoji({ createChat }: Props) {
  return (
    <S.Container className="hidden-scrollbar">
      <Suspense>
        <EmojiList createChat={createChat} />
      </Suspense>
    </S.Container>
  );
}

export default PlusMenuEmoji;
