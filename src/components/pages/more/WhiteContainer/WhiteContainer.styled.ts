/* eslint-disable import/prefer-default-export */

import styled from 'styled-components';

export const Container = styled.div<{ top: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 34px 40px;
  gap: 7px;

  position: absolute;
  width: 85%;
  min-height: calc(100% - ${(props) => props.top});
  left: calc(15% / 2);
  top: ${(props) => props.top};

  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
`;
