import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { useQuestionBoxData } from 'hooks/queries';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import QuestionCard from 'components/pages/chat/QuestionCard/QuestionCard';
import { MENT_CHAT } from 'constants/ments';
import * as S from './QuestionBoxPage.styled';

function QuestionBoxPage() {
  const navigation = useNavigate();

  const { userStore } = store;
  const { data: QnAs } = useQuestionBoxData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.PageContainer className="page-container with-topbar">
      <TopBar
        title="질문 우편함"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
      />

      <S.Questions>
        {QnAs?.length === 0 ? (
          <S.EmptyCase className="text-gradient400">
            <Icon icon="IconLogo" size={60} />
            {MENT_CHAT.QNA_EMPTY}
          </S.EmptyCase>
        ) : (
          QnAs &&
          QnAs.map((QnA) => <QuestionCard key={QnA.question.id} {...QnA} />)
        )}
      </S.Questions>
    </S.PageContainer>
  );
}

export default observer(QuestionBoxPage);
