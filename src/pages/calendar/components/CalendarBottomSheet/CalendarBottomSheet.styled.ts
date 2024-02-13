import styled, { css } from 'styled-components';

export const Input = styled.input`
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray600};
  border-radius: 10px;
  height: 30px;
  padding: 2px 5px;
  text-align: right;
`;

export const SheetContainer = styled.div`
  display: flex;

  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleSwitch = styled.div<{ isTrue: boolean }>`
  width: 40px;
  height: 20px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: ${({ isTrue }) => (isTrue ? 'white' : '#d9d9d9')};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
`;

export const ToggleBtn = styled.div<{ isTrue: boolean }>`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  ${({ isTrue }) =>
    isTrue
      ? css`
          right: 4px;
        `
      : css`
          left: 4px;
        `};
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${({ isTrue }) => (isTrue ? '#d9d9d9' : 'white')};
`;
export const Button = styled.button`
  margin: 0 auto;

  background-color: white;
  height: 40px;
  width: 150px;
  border-radius: 10px;
`;
