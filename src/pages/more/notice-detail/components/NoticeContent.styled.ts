import styled from 'styled-components';

export const Head = styled.div``;

export const Title = styled.div`
  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray800};
  font-size: 18px;
  line-height: 24px;
`;

export const Date = styled.div`
  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray400};
  font-size: 14px;
  line-height: 24px;
`;

export const Border = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray200}; ;
`;

export const Content = styled.div`
  padding: 10px 0;
  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray600};
  font-size: 16px;
`;

export const ErrorContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
