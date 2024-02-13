import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 116px;
  padding: 16px 20px;
  gap: 10px;
`;
export const InputBox = styled.div`
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
export const Input = styled.input`
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

export const Title = styled.div`
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

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: 500;
`;
