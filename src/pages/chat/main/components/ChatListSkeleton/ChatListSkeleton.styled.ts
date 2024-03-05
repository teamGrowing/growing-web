import styled from 'styled-components';

export const FetchingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
`;

export const MyChatSkeleton = styled.div`
  margin: 8px 0;
  text-align: end;
`;

export const PartnerChatSkeleton = styled.div`
  text-align: start;
  display: flex;
  gap: 8px;

  * {
    display: block;
  }
`;
