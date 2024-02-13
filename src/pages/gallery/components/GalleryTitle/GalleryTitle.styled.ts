import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 10px;

  width: 100%;
  z-index: 0;
`;

export const Left = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Right = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  padding: 0px;
  gap: 10px;

  height: 24px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const Title = styled.div`
  font-family: 'PretendardMedium';
  font-size: 23px;

  flex: 1;
`;

export const Div = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
