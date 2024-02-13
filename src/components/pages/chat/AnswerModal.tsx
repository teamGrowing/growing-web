import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import { fadeIn } from 'styles/common/keyframs';
import useToast from 'hooks/common/useToast';
import { useAnswerMutation } from 'hooks/queries';
import { QuestionsAndAnswers } from 'types/chat/questions/QuestionAndAnswers';
import { MENT_CHAT } from 'constants/ments';
import queryKeys from 'constants/queryKeys';
import ModalPortal from 'components/common/Modal/ModalPortal';

export interface ModalProps extends Pick<QuestionsAndAnswers, 'question'> {
  onModal: boolean;
  setOnModal: (state: boolean) => void;
}

const Overlay = styled.div`
  z-index: 11;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in;
`;
const Wrapper = styled.div`
  z-index: 12;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 261px;
  height: max-content;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in;

  border: 0.6px solid transparent;
  border-radius: 20px;
  background-image: linear-gradient(#fff, #fff),
    ${({ theme }) => theme.color.gradient400};
  background-origin: border-box;
  background-clip: content-box, border-box;
`;
const StyledDate = styled.div`
  width: 100%;
  padding-left: 8px;

  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray800};
`;
const StyledQuestion = styled.div`
  padding: 0px 16px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray900};
  text-align: center;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  background-color: ${({ theme }) => theme.color.white};
  padding: 24px 16px;
  border-radius: 20px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;

  width: 100%;
`;
const AnswerTextarea = styled.div`
  width: 100%;
  height: 110px;
  padding: 14px 16px;

  background: linear-gradient(
    130.11deg,
    rgba(241, 123, 65, 0.1) 7.3%,
    rgba(224, 91, 162, 0.1) 52.2%,
    rgba(205, 75, 201, 0.1) 100%
  );
  border-radius: 20px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const StyledButton = styled.button<{ main: boolean }>`
  flex: 1;

  padding: 8px 11px;
  border-radius: 20px;

  font-family: 'PretendardRegular';
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray900};

  background-color: ${({ theme }) => theme.color.gray50};
  ${(props) =>
    props.main &&
    `background: linear-gradient(130.11deg, rgba(113, 23, 234, 0.1) 7.3%, rgba(234, 96, 96, 0.1) 100%);`}
`;

function AnswerModal({ onModal, setOnModal, question }: ModalProps) {
  const queryClient = useQueryClient();

  const [myAnswer, setMyAnswer] = useState<string>('');

  const { addToast } = useToast();

  const { userStore } = store;
  const { mutate: postAnswer } = useAnswerMutation({
    coupleId: userStore.user?.coupleId ?? '',
    questionId: question.id,
    options: {
      onSuccess() {
        setOnModal(false);
        addToast(MENT_CHAT.QNA_SUCCESS);
        queryClient.invalidateQueries(queryKeys.qnaKeys.all);
      },
      // TODO: error handling
    },
  });

  const handleAnswer = () => {
    if (!myAnswer) {
      return;
    }
    postAnswer({
      content: myAnswer,
    });
  };

  if (!onModal) {
    return null;
  }

  return (
    <ModalPortal>
      <Overlay />
      <Wrapper>
        <Main>
          <StyledDate>{`#${dayjs(question.createdAt).format(
            'YYMMDD'
          )}`}</StyledDate>

          <StyledQuestion>{question.content}</StyledQuestion>

          <AnswerTextarea>
            <TextArea
              value={myAnswer}
              onChange={(e) => setMyAnswer(e.target.value)}
            />
          </AnswerTextarea>

          <Buttons>
            <StyledButton
              main={false}
              onClick={() => {
                setOnModal(false);
              }}
            >
              이따 답할래요!
            </StyledButton>
            <StyledButton main onClick={handleAnswer}>
              답변남기기
            </StyledButton>
          </Buttons>
        </Main>
      </Wrapper>
    </ModalPortal>
  );
}

export default observer(AnswerModal);
