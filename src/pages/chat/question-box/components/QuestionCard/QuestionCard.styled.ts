import styled from 'styled-components';
import { hoverShrinkEffect } from 'styles/common/mixin';

export const Container = styled.div<{ openCard: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px;
  background-color: ${({ theme }) => theme.color.white};

  background: ${(props) =>
    !props.openCard
      ? props.theme.color.white
      : 'linear-gradient( 130.11deg,   rgba(113, 23, 234, 0.03) 7.3%,  rgba(234, 96, 96, 0.05) 100% )'};

  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);

  cursor: pointer;
`;

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const StyledDate = styled.div`
  font-family: 'PretendardRegular';
  font-size: 12px;
  text-align: center;
`;

export const QuestionWrapper = styled.div`
  flex: 1;

  font-family: 'PretendardMedium';
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray700};
`;

export const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  padding: 16px;

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray500};
  text-align: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};

  p {
    font-family: 'PretendardMedium';
  }
`;

export const AnswerButton = styled.button`
  background: ${({ theme }) => theme.color.pink100};
  border-radius: 12px;
  padding: 8px 20px;

  font-size: 13px;

  :hover {
    background: ${({ theme }) => theme.color.pink200};
  }

  ${hoverShrinkEffect}
`;
