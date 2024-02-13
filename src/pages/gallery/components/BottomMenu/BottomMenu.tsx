import Icon from 'components/common/Icon/Icon';
import * as S from './BottomMenu.styled';

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
    <S.Container border={border}>
      <Icon icon="IconComment" onClick={onComment} />
      <Icon icon="IconMessageShare" onClick={onMessage} />
      <Icon icon="IconTrash" onClick={onTrash} />
    </S.Container>
  );
}

export default BottomMenu;
