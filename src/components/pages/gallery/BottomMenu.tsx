import styled from 'styled-components';
import comment from '../../../assets/icons/albumPage/Comment.png';
import messageShare from '../../../assets/icons/albumPage/MessageShare.png';
import trash from '../../../assets/icons/albumPage/Trash.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 52px 28px;
  gap: 10px;

  position: fixed;
  width: 100%;
  height: 72px;
  left: 0px;
  bottom: 0px;

  background: ${({ theme }) => theme.color.white};

  border-top: 0.8px solid ${({ theme }) => theme.color.gray200};
`;

const Icon = styled.img`
  gap: 10px;

  width: 24px;
  height: 24px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

function BottomMenu() {
  return (
    <Container>
      <Icon src={comment} />
      <Icon src={messageShare} />
      <Icon src={trash} />
    </Container>
  );
}

export default BottomMenu;
