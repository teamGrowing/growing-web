import styled from 'styled-components';

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;

  background: linear-gradient(130.11deg, #7117ea7f 7.3%, #ea60607f 100%);
  border-radius: 24px 24px 0px 0px;

  position: absolute;
  width: 100%;

  height: calc(100% - 23px - constant(safe-area-inset-top));
  height: calc(100% - 23px - env(safe-area-inset-top));
  left: 0px;
  bottom: 0px;
`;

export const ScrollArea = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 46px);
  overflow-y: scroll;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 34px;
  gap: 10px;

  width: 100%;
  height: 46px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Option = styled.button`
  padding: 2px 0px;
  height: 22px;

  color: ${({ theme }) => theme.color.white};
  font-family: 'PretendardRegular';
  font-size: 15px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
