import Icon from 'components/common/Icon/Icon';
import { MENT_CHAT } from 'constants/ments';
import * as S from './EmptyCard.styled';

const EmptyCard = () => {
  return (
    <S.EmptyCase className="text-gradient400">
      <Icon icon="IconLogo" size={60} />
      {MENT_CHAT.ARCHIVED_EMPTY}
    </S.EmptyCase>
  );
};

export default EmptyCard;
