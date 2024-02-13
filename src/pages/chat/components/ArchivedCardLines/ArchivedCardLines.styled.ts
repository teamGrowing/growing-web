import styled from 'styled-components';

export const Lines = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 32px 12px 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 1;

  border-bottom: 1px dashed ${({ theme }) => theme.color.purple200};
`;
