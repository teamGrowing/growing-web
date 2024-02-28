import styled from 'styled-components';
import EMOJI_SIZE from '../../../constants/HomeConstants';

export const Container = styled.div`
  position: relative;
`;

export const PetName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 14px;
  gap: 10px;

  width: max-content;
  max-width: calc(${EMOJI_SIZE}px - 30px);
  min-height: 33px;
  padding: 5px 14px;
  background-color: ${({ theme }) => theme.color.pink400};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray50};
`;

export const Pin = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
`;
