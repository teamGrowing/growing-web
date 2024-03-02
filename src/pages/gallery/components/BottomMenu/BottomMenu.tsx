import Icon from 'components/common/Icon/Icon';
import * as S from './BottomMenu.styled';

type Props = {
  border: boolean;
  onComment: () => void;
  onMessage: () => void;
  onTrash: () => void;
};

const BottomMenu = ({ border, onComment, onMessage, onTrash }: Props) => {
  return (
    <S.Container border={border}>
      <Icon icon="IconComment" onClick={onComment} />
      <Icon icon="IconMessageShare" onClick={onMessage} />
      <Icon icon="IconTrash" onClick={onTrash} />
    </S.Container>
  );
};

export default BottomMenu;
