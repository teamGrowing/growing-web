import { useState } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import useToast from 'hooks/common/useToast';
import { useAnswerMutation } from 'hooks/queries';
import { QuestionsAndAnswers } from 'models/chat-question';
import { MENT_CHAT } from 'constants/ments';
import queryKeys from 'libs/react-query/queryKeys';
import Portal from 'components/common/Portal';
import * as S from './AnswerModal.styled';

export interface ModalProps extends Pick<QuestionsAndAnswers, 'question'> {
  onModal: boolean;
  setOnModal: (state: boolean) => void;
}

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
    <Portal type="modal-root">
      <S.Overlay />
      <S.Wrapper>
        <S.Main>
          <S.StyledDate>{`#${dayjs(question.createdAt).format(
            'YYMMDD'
          )}`}</S.StyledDate>

          <S.StyledQuestion>{question.content}</S.StyledQuestion>

          <S.AnswerTextarea>
            <S.TextArea
              value={myAnswer}
              onChange={(e) => setMyAnswer(e.target.value)}
            />
          </S.AnswerTextarea>

          <S.Buttons>
            <S.StyledButton
              main={false}
              onClick={() => {
                setOnModal(false);
              }}
            >
              이따 답할래요!
            </S.StyledButton>
            <S.StyledButton main onClick={handleAnswer}>
              답변남기기
            </S.StyledButton>
          </S.Buttons>
        </S.Main>
      </S.Wrapper>
    </Portal>
  );
}

export default observer(AnswerModal);
