import Icon, { IconType } from 'components/common/Icon/Icon';
import * as S from './MenuBox.styled';

type MenuBoxProps = {
  title: string;
  icon: IconType;
  onClick: React.MouseEventHandler<HTMLElement>;
};

function MenuBox({ title, icon, onClick }: MenuBoxProps) {
  return (
    <S.Box onClick={onClick}>
      <Icon icon={icon} size={34} />
      <S.Title>{title}</S.Title>
    </S.Box>
  );
}

export default MenuBox;
