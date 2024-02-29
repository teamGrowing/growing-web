import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;
export const DetailContainer = styled.div`
  position: relative;
  height: calc(100% - 72px);
  background: ${({ theme }) => theme.color.background};
`;
