import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 41px 0;
`;
export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); ;
`;

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
