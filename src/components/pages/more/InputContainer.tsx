import styled from 'styled-components';
import React, { useState, SyntheticEvent, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { FieldError } from 'react-hook-form';
import Icon from 'components/common/Icon/Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 116px;
  padding: 16px 20px;
  gap: 10px;
`;

const InputBox = styled.div`
  background: linear-gradient(
        ${({ theme }) => theme.color.white},
        ${({ theme }) => theme.color.white}
      )
      padding-box,
    ${({ theme }) => theme.color.gradient400} border-box;
  border: 1px solid transparent;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  gap: 8px;

  width: 318px;
  height: 51px;
`;
const Input = styled.input`
  width: 260px;
  height: 23px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray700};
  background-color: ${({ theme }) => theme.color.white};
  border: none;
  flex: none;
  order: 0;
  flex-grow: 1;

  &:focus {
    outline: 0;
    background-color: ${({ theme }) => theme.color.white};
  }

  // for ios
  &:disabled {
    -webkit-text-fill-color: black;
    opacity: 1;
  }
`;

const Title = styled.div`
  height: 23px;

  font-family: 'PretendardMedium';

  font-size: 19px;
  line-height: 23px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: 500;
`;

type InputContainerProps = {
  title: string;
  type: 'date' | 'text';
  value: string;
  name: string;
  onChange: (e: SyntheticEvent) => void;
  onBlur: (e: SyntheticEvent) => void;
  error: FieldError | undefined;
};

const InputContainer = React.forwardRef<HTMLInputElement, InputContainerProps>(
  (
    { title, type, value, name, onChange, onBlur, error },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const clickHandler = () => {
      if (!inputRef.current) return;
      if (isFocused) {
        inputRef.current.value = '';
        inputRef.current?.focus();
        return;
      }

      setIsFocused(true);
      inputRef.current?.removeAttribute('disabled');
      inputRef.current?.focus();
    };

    const blurHandler = () => {
      setIsFocused(false);
    };

    return (
      <Container>
        <Wrapper>
          <Title>{title}</Title>
          <InputBox onBlur={blurHandler}>
            <Input
              type={type}
              disabled={!isFocused}
              defaultValue={value}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={mergeRefs([ref, inputRef])}
            />
            {(type === 'text' || (type === 'date' && !isFocused)) && (
              <Icon
                icon={isFocused ? 'IconExitCircle' : 'IconPencil'}
                size={22}
                onClick={clickHandler}
                onMouseDown={(e: React.MouseEvent) => {
                  e.preventDefault();
                }}
              />
            )}
          </InputBox>
          <ErrorMessage>{error && error.message}</ErrorMessage>
        </Wrapper>
      </Container>
    );
  }
);

export default InputContainer;
