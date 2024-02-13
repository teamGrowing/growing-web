import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;
export const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gradient400};
  flex: none;
`;

export const Title = styled.div`
  font-family: 'PretendardMedium';
  padding: 10px 20px 0px 20px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 19px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.black};

  width: 100%;
  flex: none;
`;
export const Date = styled.div`
  font-size: 10px;
  padding: 0px 20px 5px 20px;
`;
