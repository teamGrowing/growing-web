import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ReactComponent as SendIcon } from '../../../assets/icons/albumPage/Send.svg';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 20px;
  gap: 22px;

  position: absolute;
  width: 100%;
  height: 321px;

  left: 0px;
  bottom: 81px;

  background: ${({ theme }) => theme.color.white};
  border-radius: 30px 30px 0px 0px;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

const Title = styled.div`
  width: 100%;

  padding: 8px 14px;
  gap: 10px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 27px;
  color: ${({ theme }) => theme.color.black};
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14px;

  width: 100%;
  height: 145px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

const CommentInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 10px 14px;
  gap: 14px;

  width: 100%;
  height: 53px;

  flex: none;
  order: 2;
  flex-grow: 0;
`;

const Input = styled.input`
  height: 33px;

  border: double 2px transparent;
  border-radius: 30px;
  background-image: linear-gradient(white, white),
    ${({ theme }) => theme.color.gradient400};
  background-origin: border-box;
  background-clip: padding-box, border-box;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const CommentContainer = styled.div`
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

const Name = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
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
const Content = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;

  max-width: calc(100% - 58px - 28px);
  word-wrap: break-word;

  color: ${({ theme }) => theme.color.gray900};

  flex: none;
  order: 0;
  flex-grow: 1;
`;
const Delete = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
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

type CommentProps = {
  commentInfo: {
    id: string;
    content: string;
    createdAt: string;
    name: string;
    isMine: boolean;
  };
};

function Comment({ commentInfo }: CommentProps) {
  return (
    <CommentContainer>
      <Name>{commentInfo.name}</Name>
      <Content>{commentInfo.content}</Content>
      {commentInfo.isMine && <Delete>삭제</Delete>}
    </CommentContainer>
  );
}

function CommentMenu() {
  const [comments, setComments] = useState<
    Array<{
      id: string;
      content: string;
      createdAt: string;
      name: string;
      isMine: boolean;
    }>
  >([]);

  useEffect(() => {
    // 댓글 요청
    setComments([]);
  }, []);

  return (
    <Box>
      <Title>댓글 남기기</Title>
      <CommentsContainer>
        {comments.map((c) => (
          <Comment commentInfo={c} key={c.id} />
        ))}
      </CommentsContainer>
      <CommentInput>
        <Input />
        <SendIcon width={52} height={36} />
      </CommentInput>
    </Box>
  );
}

export default CommentMenu;
