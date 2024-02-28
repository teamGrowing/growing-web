import Portal from '../Portal';
import * as S from './Modal.styled';

export interface ModalProps {
  onModal: boolean;
  setOnModal: (state: boolean) => void;
  title?: string | React.ReactNode;
  description?: string;
  mainActionLabel: string;
  subActionLabel?: string;
  onMainAction: () => void;
  onSubAction?: () => void;
}

export default function Modal({
  onModal,
  setOnModal,
  title,
  description,
  mainActionLabel,
  subActionLabel,
  onMainAction,
  onSubAction,
}: ModalProps) {
  if (!onModal) {
    return null;
  }

  return (
    <Portal type="modal-root">
      <S.Overlay />
      <S.Wrapper>
        <S.Main>
          {title && <S.Title className="text-ellipsis">{title}</S.Title>}
          {description && <S.Description>{description}</S.Description>}
        </S.Main>
        <S.Buttons>
          {subActionLabel && onSubAction && (
            <S.StyledButton
              main={false}
              onClick={() => {
                setOnModal(false);
                onSubAction();
              }}
            >
              {subActionLabel}
            </S.StyledButton>
          )}
          {mainActionLabel && onMainAction && (
            <S.StyledButton
              main
              className="text-gradient300"
              onClick={() => {
                setOnModal(false);
                onMainAction();
              }}
            >
              {mainActionLabel}
            </S.StyledButton>
          )}
        </S.Buttons>
      </S.Wrapper>
    </Portal>
  );
}
