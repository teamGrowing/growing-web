import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  gap: 8px;

  width: 100px;
  height: 100px;

  background: ${({ theme }) => theme.color.gray50};
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const Title = styled.div`
  width: 49px;
  height: 17px;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 1;
  flex-grow: 0;
`;