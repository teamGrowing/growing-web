import styled from 'styled-components';
import MIN_TEXTAREA_HEIGHT from './inputChatConstants';

export const Container = styled.div`
  position: relative;
  z-index: 2;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  max-width: var(--full-width);
  min-height: calc(${MIN_TEXTAREA_HEIGHT} + var(--safe-area-bottom));
  padding-bottom: var(--safe-area-bottom);

  background-color: ${({ theme }) => theme.color.white};
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
`;

export const TextareaWrapper = styled.div`
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

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: calc(${MIN_TEXTAREA_HEIGHT} + var(--safe-area-bottom));
  resize: none;

  background-color: transparent;

  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.gray900};
`;
