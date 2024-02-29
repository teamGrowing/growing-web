import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  padding-top: 10px;
  background: ${({ theme }) => theme.color.background};
  height: 100vh;
  padding-bottom: 52px;
`;

export const Option = styled.div`
  width: 25px;
  height: 17px;

  font-family: 'PretendardMedium';
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
