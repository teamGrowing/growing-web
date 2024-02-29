import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px;
  gap: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.black};

  width: 100%;
  height: 43px;

  flex: none;
`;

export const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gradient400};
  flex: none;
`;

export const VersionMsg = styled.div`
  font-size: 13px;
`;
