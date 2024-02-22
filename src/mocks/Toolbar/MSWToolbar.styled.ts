import styled from 'styled-components';

export const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  padding: 8px 15px;
  border-radius: 20px;
  margin: 24px 0;
  background-color: ${({ theme }) => theme.color.white};
`;

export const Input = styled.input`
  height: 100%;
  flex-grow: 1;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background: ${({ theme }) => `${theme.color.purple300}`};
  border-radius: 10px;
  font-family: PretendardRegular;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray900};
  &:hover {
    background: ${({ theme }) => `${theme.color.purple400}`};
  }
  &:active {
    background: ${({ theme }) => `${theme.color.purple500}`};
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 24px 8px;
`;

export const MessageBox = styled.div`
  height: 439px;
  padding-bottom: 46px;
  font-family: 'PretendardRegular';
  color: ${({ theme }) => `${theme.color.white}`};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemsContainer = styled.div`
  height: 363px;
  overflow-y: scroll;
`;

export const ToolbarButton = styled.button`
  z-index: 99999;
  text-align: center;
  width: 33px;
  padding: 5px;
  position: fixed;
  left: 10px;
  top: 10px;
  background-color: ${({ theme }) => theme.color.pink300};
  padding: 5px;
  border-radius: 50%;
  font-size: 10px;
`;
