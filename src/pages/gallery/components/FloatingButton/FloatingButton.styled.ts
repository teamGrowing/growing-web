import styled from 'styled-components';

export const ButtonStyle = styled.div`
  position: fixed;
  right: 20px;
  bottom: calc(var(--navbar-real-height) + 10px);
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
