/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { MENT_CHAT } from 'constants/ments';
import { CoupleDto } from 'types/couple/Couple.dto';
import { QuestionsAndAnswers } from 'types/chat/questions/QuestionAndAnswers';
import Icon from 'components/common/Icon/Icon';
import AnswerModal from './AnswerModal';

const Container = styled.div<{ openCard: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px;
  background-color: ${({ theme }) => theme.color.white};

  background: ${(props) =>
    !props.openCard
      ? props.theme.color.white
      : 'linear-gradient( 130.11deg,   rgba(113, 23, 234, 0.05) 7.3%,  rgba(234, 96, 96, 0.05) 100% )'};
  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;
const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const StyledDate = styled.div`
  font-family: 'PretendardLight';
  font-size: 12px;
  text-align: center;
`;
const QuestionWrapper = styled.div`
  flex: 1;

  font-size: 15px;
  color: ${({ theme }) => theme.color.gray900};
`;
const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray600};
  padding: 10px 16px;
  text-align: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;
const AnswerButton = styled.button`
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
  border-radius: 12px;
  padding: 8px 20px;

  font-size: 13px;
`;

type Mode = 'NOT_ME' | 'NOT_PARTNER' | 'BOTH';

export default function QuestionCard({
  question,
  myAnswer,
  partnerAnswer,
}: QuestionsAndAnswers) {
  const queryClient = useQueryClient();

  const [openCard, setOpenCard] = useState<boolean>(false);
  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: couple } = queryClient.getQueryData(
    queryKeys.coupleKeys.all
  ) as AxiosResponse<CoupleDto>;

  function getMode({
    myAnswer,
    partnerAnswer,
  }: Omit<QuestionsAndAnswers, 'question'>): Mode {
    if (!myAnswer) {
      return 'NOT_ME';
    }
    if (!partnerAnswer) {
      return 'NOT_PARTNER';
    }
    return 'BOTH';
  }
  const mode: Mode = getMode({ myAnswer, partnerAnswer });

  return (
    <Container
      openCard={openCard}
      onClick={() => {
        if (onModal) {
          return;
        }
        setOpenCard(!openCard);
      }}
    >
      <QuestionContainer>
        <StyledDate className="text-gradient400">
          {dayjs(question.createdAt).format('YYYY')}
          <br />
          {dayjs(question.createdAt).format('M.D')}
        </StyledDate>

        <QuestionWrapper className={!openCard ? 'text-ellipsis' : ''}>
          {question.content}
        </QuestionWrapper>

        <Icon
          icon={openCard ? 'IconArrowUp' : 'IconArrowDown'}
          themeColor="gray400"
        />
      </QuestionContainer>

      {openCard && (
        <AnswerWrapper>
          {mode === 'NOT_ME' && (
            <>
              <p>{MENT_CHAT.QNA_NOT_ME}</p>
              <AnswerButton onClick={() => setOnModal(true)}>
                <p className="text-gradient400">답변하기</p>
              </AnswerButton>
            </>
          )}

          {mode === 'NOT_PARTNER' && <p>{MENT_CHAT.QNA_NOT_PARTER}</p>}

          {mode === 'BOTH' && (
            <>
              <p>{`${couple.myName}: ${myAnswer!.content}`}</p>
              <p>{`${couple.partnerName}: ${partnerAnswer!.content}`}</p>
            </>
          )}
        </AnswerWrapper>
      )}

      <AnswerModal
        onModal={onModal}
        setOnModal={setOnModal}
        question={question}
      />
    </Container>
  );
}
