import styled from 'styled-components';

export const ButtonStyle = styled.div`
  position: absolute;
  right: 28px;
  bottom: 15px;
  z-index: 999;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;

export const Input = styled.input`
  display: none;
`;
