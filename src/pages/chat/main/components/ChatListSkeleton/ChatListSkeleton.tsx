import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';
import * as S from './ChatListSkeleton.styled';

const StyledSkeleton = (props: SkeletonProps) => {
  return (
    <Skeleton
      width={200}
      height={30}
      baseColor="#b9b9b933"
      highlightColor="#c9c9c933"
      borderRadius={12}
      {...props}
    />
  );
};

const MyChat = () => {
  return (
    <S.MyChatSkeleton>
      <StyledSkeleton width={200} />
    </S.MyChatSkeleton>
  );
};

const PartnerChat = () => {
  return (
    <S.PartnerChatSkeleton>
      <StyledSkeleton width={30} height={30} borderRadius={100} />
      <StyledSkeleton />
    </S.PartnerChatSkeleton>
  );
};

export const ChatListFetching = () => {
  return (
    <S.FetchingContainer>
      <PartnerChat />
      <PartnerChat />
      <MyChat />
    </S.FetchingContainer>
  );
};

export const ChatListSkeleton = () => {
  return (
    <S.LoadingContainer>
      <PartnerChat />
      <PartnerChat />
      <PartnerChat />
      <MyChat />
      <MyChat />
      <MyChat />
      <PartnerChat />
      <MyChat />
      <PartnerChat />
      <PartnerChat />
      <MyChat />
      <PartnerChat />
    </S.LoadingContainer>
  );
};

export const ChatListLoading = () => {
  return (
    <TopbarInnerContainer>
      <ChatListSkeleton />
    </TopbarInnerContainer>
  );
};
