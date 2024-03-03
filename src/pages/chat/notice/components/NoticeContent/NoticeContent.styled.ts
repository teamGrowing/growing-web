import styled from 'styled-components';

export const ChatWrapper = styled.div`
  padding: 16px 32px;

  font-family: 'PretendardMedium';
  font-size: 16px;
  color: ${({ theme }) => theme.color.gray600};
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 32px;
  padding: 16px 0px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};

  > p {
    font-family: 'PretendardMedium';
    font-size: 14px;
  }
`;
