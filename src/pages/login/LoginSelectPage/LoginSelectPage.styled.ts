import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};
`;

export const WelcomeText = styled.div`
  font-family: 'PretendardMedium';
  text-align: center;

  white-space: pre-wrap;
  word-break: break-all;
`;

export const MyCode = styled.p`
  font-family: 'PretendardMedium';
  font-size: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  width: 100%;
`;
