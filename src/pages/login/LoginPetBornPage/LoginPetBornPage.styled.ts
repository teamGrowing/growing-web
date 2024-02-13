import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

export const StyledP = styled.p`
  white-space: pre-wrap;
  text-align: center;
`;
