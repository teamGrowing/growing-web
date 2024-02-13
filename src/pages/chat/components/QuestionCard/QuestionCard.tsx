/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import dayjs from 'dayjs';
import { AxiosResponse } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { MENT_CHAT } from 'constants/ments';
import { CoupleDto } from 'models/couple';
import Icon from 'components/common/Icon/Icon';
import { QuestionsAndAnswers } from 'models/chat-question';
import AnswerModal from '../AnswerModal/AnswerModal';
import * as S from './QuestionCard.styled';

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
    <S.Container
      openCard={openCard}
      onClick={() => {
        if (onModal) {
          return;
        }
        setOpenCard(!openCard);
      }}
    >
      <S.QuestionContainer>
        <S.StyledDate className="text-gradient400">
          {dayjs(question.createdAt).format('YYYY')}
          <br />
          {dayjs(question.createdAt).format('M.D')}
        </S.StyledDate>

        <S.QuestionWrapper className={!openCard ? 'text-ellipsis' : ''}>
          {question.content}
        </S.QuestionWrapper>

        <Icon
          icon={openCard ? 'IconArrowUp' : 'IconArrowDown'}
          themeColor="gray400"
        />
      </S.QuestionContainer>

      {openCard && (
        <S.AnswerWrapper>
          {mode === 'NOT_ME' && (
            <>
              <p>{MENT_CHAT.QNA_NOT_ME}</p>
              <S.AnswerButton onClick={() => setOnModal(true)}>
                <p className="text-gradient400">답변하기</p>
              </S.AnswerButton>
            </>
          )}

          {mode === 'NOT_PARTNER' && <p>{MENT_CHAT.QNA_NOT_PARTER}</p>}

          {mode === 'BOTH' && (
            <>
              <p>{`${couple.myName}: ${myAnswer!.content}`}</p>
              <p>{`${couple.partnerName}: ${partnerAnswer!.content}`}</p>
            </>
          )}
        </S.AnswerWrapper>
      )}

      <AnswerModal
        onModal={onModal}
        setOnModal={setOnModal}
        question={question}
      />
    </S.Container>
  );
}
