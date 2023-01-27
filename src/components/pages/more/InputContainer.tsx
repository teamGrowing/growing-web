import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import Icon from '../../common/Icon/Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  gap: 10px;

  width: 100%;
  height: 116px;

  border-radius: 20px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
const InputBox = styled.div`
  background: linear-gradient(
        ${({ theme }) => theme.color.white},
        ${({ theme }) => theme.color.white}
      )
      padding-box,
    ${({ theme }) => theme.color.gradient400} border-box;
  border: 2px solid transparent;
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

type InputContainerProps = {
  title: string;
  type: 'date' | 'text';
  value: string;
};

function InputContainer({ title, type, value }: InputContainerProps) {
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
      <Title>{title}</Title>
      <InputBox onBlur={blurHandler}>
        <Input
          type={type}
          disabled={!isFocused}
          defaultValue={value}
          ref={inputRef}
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
    </Container>
  );
}

export default InputContainer;
