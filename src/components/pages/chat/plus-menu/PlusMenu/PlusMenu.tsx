import { observer } from 'mobx-react';
import { plusMenuProps } from 'stores/ChatStore';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import { CreateChattingDto } from 'types/chat/createChat.dto';
import PlusMenuEmoji from '../PlusMenuEmoji/PlusMenuEmoji';
import * as S from './PlusMenu.styled';

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function PlusMenu({ createChat }: InputChatProps) {
  const { chatStore } = store;
  const { mode } = chatStore.chatMode;

  if (!plusMenuProps.includes(mode)) {
    return null;
  }

  if (mode === 'Emoji') {
    return <PlusMenuEmoji createChat={createChat} />;
  }

  return (
    <S.Container>
      {mode === 'Menu' && (
        <S.MenuContainer>
          <S.Item onClick={() => chatStore.setChatMode({ mode: 'Gallery' })}>
            <S.StyledIcon>
              <Icon icon="IconGallery" size={30} />
            </S.StyledIcon>
            <p className="text-gradient400">사진</p>
          </S.Item>
          <S.Item onClick={() => chatStore.setChatMode({ mode: 'Camera' })}>
            <S.StyledIcon>
              <Icon icon="IconCamera" size={30} />
            </S.StyledIcon>
            <p className="text-gradient400">카메라</p>
          </S.Item>
          {/* TODO */}
          {/* <S.Item onClick={() => chatStore.setChatMode({ mode: 'Voice' })}>
            <S.StyledIcon>
              <Icon icon="IconVoice" size={30} />
            </S.StyledIcon>
            <p className="text-gradient400">음성</p>
          </S.Item>
          <S.Item onClick={() => chatStore.setChatMode({ mode: 'Map' })}>
            <S.StyledIcon>
              <Icon icon="IconMap" size={30} />
            </S.StyledIcon>
            <p className="text-gradient400">지도</p>
          </S.Item> */}
        </S.MenuContainer>
      )}
    </S.Container>
  );
}

export default observer(PlusMenu);
