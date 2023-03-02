import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import store from '../../stores/RootStore';
import useQuestionBoxData from '../../hooks/queries/chat.queries';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import QuestionCard from '../../components/pages/chat/QuestionCard';

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
  padding: 0 16px;
`;
const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px 0;
`;

function QuestionBoxPage() {
  const navigation = useNavigate();

  const { userStore } = store;
  const { data: QnAs } = useQuestionBoxData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <PageContainer className="page-container with-topbar">
      <TopBar
        title="질문 우편함"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
      />

      <Questions>
        {/* TODO: 질문없을 때 */}
        {QnAs &&
          QnAs.map((QnA) => <QuestionCard key={QnA.question.id} {...QnA} />)}
      </Questions>
    </PageContainer>
  );
}

export default observer(QuestionBoxPage);
