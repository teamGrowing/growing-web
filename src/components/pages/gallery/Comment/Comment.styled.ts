import styled from 'styled-components';

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 100%;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Name = styled.div`
  font-family: 'PretendardRegular';
  font-size: 15px;
  line-height: 18px;

  padding: 0 14px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const Content = styled.div`
  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;

  max-width: calc(100% - 58px - 28px);
  word-wrap: break-word;

  color: ${({ theme }) => theme.color.gray900};

  flex: none;
  order: 0;
  flex-grow: 1;
`;
export const Delete = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
