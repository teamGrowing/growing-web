import styled from 'styled-components';

export const Container = styled.button`
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledEgg = styled.img`
  width: 190px;
  height: 190px;
`;

export const ClickText = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
`;
