import styled from 'styled-components';

export const SwiperControlbar = styled.div`
  z-index: 2;

  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  gap: 10px;

  padding: 0 16px 8px;

  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray50};
`;
