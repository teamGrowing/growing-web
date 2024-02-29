import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;
export const DetailContainer = styled.div`
  background: ${({ theme }) => theme.color.background};
  position: relative;
  height: calc(100% - 72px);
`;
