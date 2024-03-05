import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  padding: 8px 20px 8px 36px;

  * {
    color: ${({ theme }) => theme.color.gray700};
    font-family: 'PretendardMedium';
  }
`;
