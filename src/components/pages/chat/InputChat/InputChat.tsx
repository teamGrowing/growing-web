/* eslint-disable import/no-cycle */
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { ChatType, plusMenuProps } from 'stores/ChatStore';
import { CreateChattingDto } from 'models/chat';
import Icon from 'components/common/Icon/Icon';
import PlusMenu from '../plus-menu/PlusMenu/PlusMenu';
import PlusMenuGallery from '../plus-menu/PlusMenuGallery/PlusMenuGallery';
import MIN_TEXTAREA_HEIGHT from './inputChatConstants';
import * as S from './InputChat.styled';

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
  scrollByPlusMenu: (isOpen: boolean) => void;
};

function InputChat({ createChat, scrollByPlusMenu }: InputChatProps) {
  const { userStore, chatStore } = store;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>('');

  const plusBtnModes: ChatType[] = ['Default', 'Reply', 'Context'];

  const handleScroll = (t: ChatType) => {
    if (t === 'Default') {
      scrollByPlusMenu(false);
      chatStore.setChatMode({ mode: t });
    } else if (plusMenuProps.includes(chatStore.chatMode.mode)) {
      chatStore.setChatMode({ mode: t });
    } else if (chatStore.chatMode.mode === 'Chatting') {
      textareaRef.current?.blur();
      setTimeout(() => {
        chatStore.setChatMode({ mode: t });
      }, 200);
    } else if (chatStore.chatMode.mode !== t) {
      chatStore.setChatMode({ mode: t });
      scrollByPlusMenu(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = () => {
    // TODO: emoji, voice
    const dto: CreateChattingDto = {
      content: textareaRef.current?.value ?? '',
      emojiId: null,
      imageIds: [],
      voiceMsgIds: [],
      userId: userStore.user?.id ?? '',
      coupleId: userStore.user?.coupleId ?? '',
    };
    createChat(dto);
    setValue('');
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }
    textareaRef.current.style.height = 'inherit';
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [textareaRef.current?.value]);

  if (
    chatStore.chatMode.mode === 'Gallery' ||
    chatStore.chatMode.mode === 'GalleryAll'
  ) {
    return <PlusMenuGallery createChat={createChat} />;
  }

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <S.InputContainer>
        {plusBtnModes.includes(chatStore.chatMode.mode) ? (
          <Icon icon="IconPlus" onClick={() => handleScroll('Menu')} />
        ) : (
          <Icon icon="IconExit" onClick={() => handleScroll('Default')} />
        )}

        <Icon icon="IconSmile" onClick={() => handleScroll('Emoji')} />

        <S.TextareaWrapper>
          <S.StyledTextarea
            ref={textareaRef}
            rows={1}
            value={value}
            onClick={() => handleScroll('Chatting')}
            onChange={onChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {textareaRef.current?.value && (
            <Icon icon="IconArrowTopCircle" onClick={handleSubmit} />
          )}
        </S.TextareaWrapper>
      </S.InputContainer>
      <PlusMenu createChat={createChat} />
    </S.Container>
  );
}

export default observer(InputChat);
