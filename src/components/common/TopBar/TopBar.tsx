import * as S from './TopBar.styled';
import { TopBarMode } from './types/TopBarMode';


export interface TopBarProps {
  mode?: TopBarMode;
  leftNode?: React.ReactNode;
  onLeftClick?: () => void;
  title?: string;
  subTitle?: string;
  rightMainNode?: React.ReactNode;
  onRightMainClick?: () => void;
  rightSubNode?: React.ReactNode;
  onRightSubClick?: () => void;
  border?: boolean;
}

export default function TopBar({
  mode,
  leftNode,
  onLeftClick,
  title,
  subTitle,
  rightMainNode,
  onRightMainClick,
  rightSubNode,
  onRightSubClick,
  border,
}: TopBarProps) {
  return (
    <S.Container mode={mode as TopBarMode} border={border ?? true}>
      <S.LeftNode onClick={onLeftClick}>{leftNode}</S.LeftNode>
      <S.Center>
        {title && (
          <S.Title
            className="text-ellipsis"
            mode={mode ?? 'LIGHT'}
            hasSubTitle={!!subTitle}
          >
            {title}
          </S.Title>
        )}
        {subTitle && (
          <S.SubTitle className="text-ellipsis" mode={mode ?? 'LIGHT'}>
            {subTitle}
          </S.SubTitle>
        )}
      </S.Center>
      <S.RightSubNode mode={mode as TopBarMode} onClick={onRightSubClick}>
        {rightSubNode}
      </S.RightSubNode>
      <S.RightMainNode mode={mode as TopBarMode} onClick={onRightMainClick}>
        {rightMainNode}
      </S.RightMainNode>
    </S.Container>
  );
}
