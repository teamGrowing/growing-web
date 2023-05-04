import styled from 'styled-components';
import Icon from 'components/common/Icon/Icon';

const Container = styled.div<{ border: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 52px 28px;
  gap: 10px;

  position: absolute;
  width: 100%;
  height: 72px;
  left: 0px;
  bottom: 0px;

  background: ${({ theme }) => theme.color.white};

  border-top: 0.8px solid
    ${({ theme, border }) => (border ? theme.color.gray200 : theme.color.white)};
`;

type BottomMenuProps = {
  border: boolean;
  onComment: () => void;
  onMessage: () => void;
  onTrash: () => void;
};

function BottomMenu({
  border,
  onComment,
  onMessage,
  onTrash,
}: BottomMenuProps) {
  return (
    <Container border={border}>
      <Icon icon="IconComment" onClick={onComment} />
      <Icon icon="IconMessageShare" onClick={onMessage} />
      <Icon icon="IconTrash" onClick={onTrash} />
    </Container>
  );
}

export default BottomMenu;
