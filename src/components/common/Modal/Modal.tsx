import React from 'react';
import styled, { keyframes } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import albumSchema, { AlbumFormValues } from '../../../types/InputSchema';

export interface ModalProps {
  title?: string;
  description?: string;
  albumInputMode?: boolean;
  mainAction?: string;
  subAction?: string;
  onMainAction?: () => void;
  onSubAction?: () => void;
  onSubmit?: (data: AlbumFormValues) => void;
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in;
`;
const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 246px;
  height: max-content;
  background: ${({ theme }) => theme.color.gray600};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
const Main = styled.div`
  width: 100%;
  padding: 17px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
const Title = styled.div`
  width: 100%;
  font-family: 'PretendardBold';
  font-size: 17px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
`;
const Description = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-all;
`;
const Buttons = styled.div`
  width: 100%;
  border-top: 0.5px solid ${({ theme }) => theme.color.gray50}50;
  display: flex;
`;
const StyledButton = styled.button<{ main: boolean }>`
  font-family: 'PretendardRegular';
  font-size: 14px;
  padding: 8px 0;
  flex: 1;
  ${(props) => !props.main && `color: ${props.theme.color.gray50};`}
  ${(props) =>
    !props.main && `border-right: 0.5px solid ${props.theme.color.gray50}50;`}
`;
const InputContainer = styled.div`
  padding: 4px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputRow = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray50};
  display: flex;
  justify-content: center;
  gap: 10px;

  p {
    padding-top: 5px;
    width: 40px;
    text-align: center;
    font-size: 12px;
  }
`;
const StyledInput = styled.input`
  padding: 4px 10px;
  height: 25px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  opacity: 0.8;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray900};
  flex: 1;
`;
const InputWithError = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    padding-left: 2px;
    width: max-content;
  }
`;

export default function Modal({
  title,
  description,
  albumInputMode,
  mainAction,
  subAction,
  onMainAction,
  onSubAction,
  onSubmit,
}: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumFormValues>({ resolver: yupResolver(albumSchema) });

  return (
    <Overlay>
      <form onSubmit={handleSubmit(onSubmit!)}>
        <Wrapper>
          <Main>
            {title && <Title className="text-ellipsis">{title}</Title>}
            {description && <Description>{description}</Description>}

            {albumInputMode && (
              <InputContainer>
                <InputRow>
                  <p>제목</p>
                  <InputWithError>
                    <StyledInput {...register('albumTitle')} />
                    <p className="text-gradient300">
                      {errors?.albumTitle?.message}
                    </p>
                  </InputWithError>
                </InputRow>
                <InputRow>
                  <p>소제목</p>
                  <InputWithError>
                    <StyledInput {...register('albumSubTitle')} />
                    <p className="text-gradient300">
                      {errors?.albumSubTitle?.message}
                    </p>
                  </InputWithError>
                </InputRow>
              </InputContainer>
            )}
          </Main>

          <Buttons>
            {subAction && (
              <StyledButton main={false} onClick={onSubAction}>
                {subAction}
              </StyledButton>
            )}
            {mainAction && (
              <StyledButton
                main
                className="text-gradient300"
                onClick={() => {
                  if (onMainAction) onMainAction();
                }}
              >
                {mainAction}
              </StyledButton>
            )}
          </Buttons>
        </Wrapper>
      </form>
    </Overlay>
  );
}

Modal.defaultProps = {
  mainAction: '확인',
};
