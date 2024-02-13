import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { MENT_LOGIN } from 'constants/ments';
import Wave from 'components/pages/login/Wave/Wave';
import Egg from 'components/pages/login/Egg/Egg';
import LoginButton from 'components/pages/login/LoginButton/LoginButton';
import { useUserIsCouple } from 'hooks/queries';
import * as S from './LoginPetBornPage.styled';

function LoginPetBornPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  const { data: isCouple } = useUserIsCouple({
    userId: userStore.user?.id ?? '',
    options: {
      suspense: false,
      enabled: !!userStore.user?.id,
    },
  });

  const handleClick = () => {
    if (isCouple) {
      navigation('/', { replace: true });
    } else {
      navigation('/login/waiting', { replace: true });
    }
  };

  return (
    <S.PageContainer className="page-container">
      <LoginButton ment={MENT_LOGIN.PET_MEET} onClick={handleClick} />

      <S.StyledP className="text-gradient400">{MENT_LOGIN.PET_BIRTH}</S.StyledP>
      <Egg />
      <Wave />
    </S.PageContainer>
  );
}

export default observer(LoginPetBornPage);
