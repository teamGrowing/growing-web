import styled from 'styled-components';

export const Button = styled.button<{ abLeft: string; abTop: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  position: absolute;
  height: 37px;
  left: ${(props) => props.abLeft};
  top: ${(props) => props.abTop};

  background: ${({ theme }) => theme.color.white}e5;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 10px;
`;

export const Content = styled.div`
  height: 17px;

  font-family: 'PretendardMedium';
  font-size: 14px;
  line-height: 17px;

  text-align: center;
`;
