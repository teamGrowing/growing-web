import styled from 'styled-components';

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 250px;
  gap: 16px;
`;

export const Message = styled.div`
  width: 230px;
  height: 62px;

  display: flex;
  align-items: center;
  text-align: center;
`;

export const FontSpan = styled.span`
  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
`;

export const ListWrapper = styled.div<{ noScroll?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  justify-items: center;
  overflow: ${(props) => props.noScroll && 'hidden'};
  padding: 20px 20px 50px;
`;
