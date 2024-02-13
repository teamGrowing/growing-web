import styled from 'styled-components';
import { PLUS_MENU_HEIGHT } from 'constants/constants';

export const Container = styled.div`
  width: 100%;
  height: ${PLUS_MENU_HEIGHT}px;
`;

export const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  justify-items: center;

  padding: 16px 32px;

  background-color: ${({ theme }) => theme.color.white};
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 10px 0;
  > p {
    font-size: 14px;
  }
`;

export const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;

  background-color: ${({ theme }) => theme.color.gray100}cc;
  border-radius: 20px;
`;
