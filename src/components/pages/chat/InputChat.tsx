/* eslint-disable import/no-cycle */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import store from '../../../stores/RootStore';
import { ChatType } from '../../../stores/ChatStore';
import { CreateChattingDto } from '../../../types/chat/createChat.dto';
import Icon from '../../common/Icon/Icon';
import PlusMenu from './PlusMenu';

const MIN_TEXTAREA_HEIGHT = 24;

const Container = styled.div`
  width: 100%;
  max-width: 780px;

  background-color: ${({ theme }) => theme.color.white};
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
`;
const TextareaWrapper = styled.div`
  flex: 1;

  position: relative;

  display: flex;
  justify-content: space-between;
  /* TODO: 줄 수에 따라서 변경 */
  align-items: center;
  gap: 4px;

  border: 1px solid transparent;
  /* TODO: 줄 수에 따라서 변경 */
  border-radius: 10px;

  background-color: ${({ theme }) => theme.color.gray50};
  background-clip: padding-box;

  padding: 4px 4px 4px 14px;

  ::after {
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;

    z-index: -1;
    /* TODO: 줄 수에 따라서 변경 */
    border-radius: 10px;

    content: '';
    background: ${({ theme }) => theme.color.gradient400};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: ${MIN_TEXTAREA_HEIGHT};
  resize: none;

  background-color: transparent;

  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.gray900};
`;

type InputChatProps = {
  createChat: (dto: CreateChattingDto) => void;
};

function InputChat({ createChat }: InputChatProps) {
  const { userStore, chatStore } = store;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>('');

  const plusBtnModes: ChatType[] = ['Default', 'Reply', 'Context'];

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = () => {
    // TODO: emoji, image, voice
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

  return (
    <Container>
      <InputContainer>
        {plusBtnModes.includes(chatStore.chatMode.mode) ? (
          <Icon
            icon="IconPlus"
            onClick={() => {
              chatStore.setChatMode({ mode: 'Menu' });
            }}
          />
        ) : (
          <Icon
            icon="IconExit"
            onClick={() => {
              chatStore.setChatMode({ mode: 'Default' });
            }}
          />
        )}

        {/* TODO: emoji */}
        <Icon icon="IconSmile" />

        <TextareaWrapper>
          <StyledTextarea
            ref={textareaRef}
            rows={1}
            value={value}
            onClick={() => chatStore.setChatMode({ mode: 'Default' })}
            onChange={onChange}
            // TODO: shift + enter는 가능하도록
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
        </TextareaWrapper>
      </InputContainer>
      <PlusMenu />
    </Container>
  );
}

export default observer(InputChat);