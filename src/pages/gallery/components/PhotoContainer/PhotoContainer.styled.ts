import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(191px, 1fr));
  margin: 1px 14px;
  padding-bottom: calc(var(--navbar-real-height) + 50px);
  grid-gap: 6px;
  justify-items: center;
  align-items: center;

  @media (min-width: 360px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

export const Logo = styled.div`
  margin: 0 auto;
  margin-top: 124px;

  z-index: 1;
`;

export const Message = styled.div`
  width: 100%;
  height: 62px;

  margin-top: 16px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 0px 8px rgba(151, 71, 255, 0.2);

  z-index: 0;
`;

export const EmptyContainer = styled.div`
  text-align: center;
`;
