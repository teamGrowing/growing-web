import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray500};
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Method = styled.div`
  width: 60px;
  height: 22px;
  background-color: ${({ theme }) => theme.color.purple50};
  color: ${({ theme }) => theme.color.black};
  font-family: 'PretendardBold';
  font-size: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
`;

export const Path = styled.div`
  font-family: 'PretendardRegular';
  word-break: break-all;
  width: calc(100% - 70px);
`;

export const Options = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: end;
  font-size: 14px;
`;

export const DelayTime = styled.input`
  width: 80px;
  height: 25px;
  padding: 4px 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  background-color: ${({ theme }) => theme.color.white};
`;

export const Option = styled.select`
  width: 80px;
  height: 25px;
  padding-left: 6px;
  border-radius: 8px;
`;
