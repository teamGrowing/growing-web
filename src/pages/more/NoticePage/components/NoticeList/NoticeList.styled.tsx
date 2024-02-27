import styled from 'styled-components';
import { hoverShrinkEffect } from 'styles/common/mixin';

export const Box = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.white}aa;
  border-radius: 10px;

  ${hoverShrinkEffect}
`;

export const Title = styled.div`
  font-family: 'PretendardMedium';

  font-size: 16px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.gray700};
`;

export const Date = styled.div`
  font-family: 'PretendardMedium';
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray400};

  padding-left: 2px;
`;

export const ErrorContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
`;

export const Button = styled.button`
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
