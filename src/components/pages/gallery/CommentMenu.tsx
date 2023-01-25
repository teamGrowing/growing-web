import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ReactComponent as SendIcon } from '../../../assets/icons/albumPage/Send.svg';
import PhotoCommentDto from '../../../types/gallery/PhotoComment.dto';
import Comment from './Comment';

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

  font-family: 'PretendardMedium';
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

function CommentMenu() {
  const [comments, setComments] = useState<PhotoCommentDto[]>([]);

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
