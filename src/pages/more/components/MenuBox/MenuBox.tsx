import Icon, { IconType } from 'components/common/Icon/Icon';
import * as S from './MenuBox.styled';

type Props = {
  title: string;
  icon: IconType;
  onClick: React.MouseEventHandler<HTMLElement>;
};

const MenuBox = ({ title, icon, onClick }: Props) => {
  return (
    <S.Box onClick={onClick}>
      <Icon icon={icon} size={30} />
      <S.Title>{title}</S.Title>
    </S.Box>
  );
};

export default MenuBox;
