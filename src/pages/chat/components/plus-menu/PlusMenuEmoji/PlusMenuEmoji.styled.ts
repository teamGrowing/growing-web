import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 260px;
  overflow-y: scroll;
`;

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

export const StyledImg = styled.img<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  /* FIXME: safari에서 작동잘안함 */
  filter: ${(props) => (props.isActive ? 'grayscale(0)' : 'grayscale(1)')};
`;
