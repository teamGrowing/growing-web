import styled from 'styled-components';
import { fadeInOut } from 'styles/common/animation';

export const MessageBox = styled.div`
  display: flex;
  visibility: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;
  margin: 0 auto;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 120px;
  width: 300px;

  background: ${({ theme }) => theme.color.gray800};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  animation: ${fadeInOut} 2s;
`;

export const Text = styled.div`
  width: 260px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;

  > span {
    -webkit-text-fill-color: initial;
  }

  flex: none;
  order: 0;
  flex-grow: 1;
`;
