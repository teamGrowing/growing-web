import styled from 'styled-components';

export const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  justify-items: center;

  padding: 0 16px 32px;
`;

export const StyledImg = styled.img`
  width: auto;
  max-width: 80px;
  height: auto;
  max-height: 80px;

  border-radius: 12px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 80%;
`;
