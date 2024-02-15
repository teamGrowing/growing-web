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
  padding: 10px;
  background: ${({ theme }) => `${theme.color.purple400}80`};
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: PretendardRegular;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.black};
  &:hover {
    background: ${({ theme }) => `${theme.color.purple500}80`};
  }
  &:active {
    background: ${({ theme }) => `${theme.color.purple600}80`};
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
