import styled from 'styled-components';

export const ButtonStyle = styled.div`
  position: fixed;
  right: 28px;
  bottom: 48px;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;
