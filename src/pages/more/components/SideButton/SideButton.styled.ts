import styled from 'styled-components';

export const Button = styled.button<{ abLeft: string; abTop: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  position: absolute;
  width: 85px;
  height: 37px;
  left: ${(props) => props.abLeft};
  top: ${(props) => props.abTop};

  background: ${({ theme }) => theme.color.white}e5;
  box-shadow: 2px 2px 6px ${({ theme }) => theme.color.black}19;
  border-radius: 10px;
`;
export const Content = styled.div`
  height: 17px;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;

  text-align: center;
`;
