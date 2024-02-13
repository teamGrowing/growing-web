import styled from 'styled-components';

export const NewDay = styled.div`
  margin: 24px auto 13px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
  border-radius: 100px;
  padding: 4px 10px;

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Container = styled.div<{ isMine: boolean }>`
  position: relative;

  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 8px;

  padding: 4px 0;
`;

export const VideoWrapper = styled.div`
  position: relative;

  ::after {
    content: '';
    display: block;

    position: absolute;
    top: 0;
    bottom: 4px;
    left: 0;
    right: 0;

    background-color: #00000070;
    border-radius: 12px;
  }
`;

export const OneChatImage = styled.img`
  max-width: 140px;
  max-height: 200px;
  background-size: 50%;
  border-radius: 12px;
`;

export const ChatImage = styled.img`
  width: 55px;
  height: 55px;

  border-radius: 6px;
`;

export const ChatImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 55px;
  grid-gap: 2px;
  justify-items: center;
`;

export const ProfileImg = styled.img`
  align-self: flex-start;

  width: 30px;
  height: 30px;

  background-color: ${({ theme }) => theme.color.gray400};
  border-radius: 10px;
`;

export const DateWrapper = styled.div`
  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const ChatWrapper = styled.div<{ isMine: boolean }>`
  position: relative;

  padding: 10px;

  max-width: 270px;

  background: ${(props) =>
    !props.isMine
      ? `${props.theme.color.gray200}99`
      : 'linear-gradient(130.11deg, rgba(113, 23, 234, 0.1) 7.3%,  rgba(234, 96, 96, 0.1) 100%)'};
  border-radius: 8px;

  p {
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 20;
    -webkit-box-orient: vertical;

    font-size: 14px;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const OverflowChat = styled.div`
  z-index: 1;
`;

export const ViewAllButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 4px 4px;

  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray600};
`;

export const StyledP = styled.p``;
