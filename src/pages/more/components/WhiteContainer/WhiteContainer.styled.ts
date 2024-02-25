import styled from 'styled-components';

export const Container = styled.div<{ top: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 40px;
  gap: 7px;

  position: absolute;
  width: 100%;
  min-height: calc(100% - ${(props) => props.top});
  top: ${(props) => props.top};

  background-color: ${({ theme }) => theme.color.white}a8;
  border-radius: 30px 30px 0px 0px;
`;
