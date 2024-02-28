import styled from 'styled-components';

export const ErrorMessage = styled.div`
  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
`;

export const ResetButton = styled.button`
  margin: 30px;
  padding: 10px;

  background: ${({ theme }) => theme.color.gradient400};
  border: 1px solid ${({ theme }) => theme.color.gray50};
  border-radius: 30px;

  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
