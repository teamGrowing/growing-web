import styled, { keyframes } from 'styled-components';

export const keyframe = keyframes`
 from {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export const Container = styled.div<{ isMine: boolean; isTop: boolean }>`
  z-index: 2;

  position: absolute;
  ${(props) =>
    props.isTop ? 'top: calc(100% + 8px);' : 'bottom: calc(100% + 8px);'}
  ${(props) => (props.isMine ? 'right: 0;' : 'left: 38px;')}

  display: flex;
  flex-direction: column;

  width: 150px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);

  animation: ${keyframe} 0.2s;
`;

export const Item = styled.div<{ lastItem?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;

  border-bottom: ${(props) =>
    !props.lastItem ? `1px solid ${props.theme.color.gray200}` : ''};

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray700};
`;
