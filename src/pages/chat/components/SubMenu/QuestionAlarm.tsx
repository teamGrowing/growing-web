import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { useHasQuestionData } from 'hooks/queries';
import * as S from './SubMenu.styled';

const QuestionAlarm = () => {
  const { userStore } = store;
  const { data: isTodo } = useHasQuestionData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  if (!isTodo?.result) {
    return null;
  }

  return <S.Alarm />;
};

export default observer(QuestionAlarm);
