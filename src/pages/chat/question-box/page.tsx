import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import QuestionCardList from './components/QuestionCard/QuestionCardList';
import * as S from './page.styled';

function QuestionBoxPage() {
  const navigation = useNavigate();

  return (
    <S.PageContainer>
      <TopBar
        title="질문 우편함"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
      />

      <QuestionCardList />
    </S.PageContainer>
  );
}

export default QuestionBoxPage;
