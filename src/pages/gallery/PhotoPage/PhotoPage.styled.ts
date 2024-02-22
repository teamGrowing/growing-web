import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Cancel = styled.div`
  height: 100%;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 24px;
`;

export const PaddingContainer = styled.div`
  position: absolute;
  top: calc(44px + constant(safe-area-inset-top) + 16px);
  top: calc(44px + env(safe-area-inset-top) + 16px);

  padding-bottom: calc(72px + constant(safe-area-inset-bottom));
  padding-bottom: calc(72px + env(safe-area-inset-bottom));

  width: 100%;
  max-width: 780px;
  height: calc(100vh - 52px - constant(safe-area-inset-top));
  height: calc(100vh - 52px - env(safe-area-inset-top));

  overflow-y: scroll;
`;
