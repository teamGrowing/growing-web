import React, { useState, SyntheticEvent, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { FieldError } from 'react-hook-form';
import Icon from 'components/common/Icon/Icon';
import * as S from './InputContainer.styled';

type Props = {
  title: string;
  type: 'date' | 'text';
  value: string;
  name: string;
  onChange: (e: SyntheticEvent) => void;
  onBlur: (e: SyntheticEvent) => void;
  error: FieldError | undefined;
};

const InputContainer = React.forwardRef<HTMLInputElement, Props>(
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
      <S.Container>
        <S.Wrapper>
          <S.Title>{title}</S.Title>
          <S.InputBox onBlur={blurHandler}>
            <S.Input
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
          </S.InputBox>
          <S.ErrorMessage>{error && error.message}</S.ErrorMessage>
        </S.Wrapper>
      </S.Container>
    );
  }
);

export default InputContainer;
