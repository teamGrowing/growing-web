import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { albumSchema, AlbumFormValues } from 'libs/react-hook-form';
import * as S from './AlbumModal.styled';
import Portal from '../../../../components/common/Portal';

export interface AlbumModalProps {
  onModal: boolean;
  setOnModal: (state: boolean) => void;
  title?: string;
  mainActionLabel: string;
  subActionLabel?: string;
  onMainAction: (data: AlbumFormValues) => void;
  onSubAction?: () => void;
}

export default function Modal({
  onModal,
  setOnModal,
  title,
  mainActionLabel,
  subActionLabel,
  onMainAction,
  onSubAction,
}: AlbumModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumFormValues>({ resolver: yupResolver(albumSchema) });

  if (!onModal) {
    return null;
  }

  return (
    <Portal type="modal-root">
      <S.Overlay />
      <form
        onSubmit={handleSubmit((data) => {
          onMainAction(data);
          setOnModal(false);
        })}
      >
        <S.Wrapper>
          <S.Main>
            {title && <S.Title className="text-ellipsis">{title}</S.Title>}
            <S.InputContainer>
              <S.InputRow>
                <p>제목</p>
                <S.InputWithError>
                  <S.StyledInput {...register('albumTitle')} />
                  <p className="text-gradient300">
                    {errors?.albumTitle?.message}
                  </p>
                </S.InputWithError>
              </S.InputRow>
              <S.InputRow>
                <p>소제목</p>
                <S.InputWithError>
                  <S.StyledInput {...register('albumSubTitle')} />
                  <p className="text-gradient300">
                    {errors?.albumSubTitle?.message}
                  </p>
                </S.InputWithError>
              </S.InputRow>
            </S.InputContainer>
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
            {mainActionLabel && (
              <S.StyledButton main className="text-gradient300">
                {mainActionLabel}
              </S.StyledButton>
            )}
          </S.Buttons>
        </S.Wrapper>
      </form>
    </Portal>
  );
}
