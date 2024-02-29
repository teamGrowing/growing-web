import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 20px;
  gap: 22px;

  position: absolute;
  width: 100%;
  height: 321px;

  left: 0px;
  bottom: 72px;

  background: ${({ theme }) => theme.color.white};
  border-radius: 30px 30px 0px 0px;

  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

export const Title = styled.div`
  width: 100%;

  padding: 8px 14px;
  gap: 10px;

  font-family: 'PretendardMedium';
  font-size: 23px;
  line-height: 27px;
  color: ${({ theme }) => theme.color.black};
`;

export const CommentsContainer = styled.div`
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

export const CommentInput = styled.div`
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

export const Input = styled.input`
  height: 33px;

  border: double 2px transparent;
  border-radius: 30px;
  background-image: linear-gradient(white, white),
    ${({ theme }) => theme.color.gradient400};
  background-origin: border-box;
  background-clip: padding-box, border-box;

  padding: 5px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

export const Send = styled.div`
  background-image: ${({ theme }) => theme.color.gradient400};
  padding: 6px 14px;
  border-radius: 30px;
  display: flex;
`;
