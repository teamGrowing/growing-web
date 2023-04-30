import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import store from '../../stores/RootStore';
import { MENT_LOGIN } from '../../constants/ments';
import Wave from '../../components/pages/login/Wave';
import Egg from '../../components/pages/login/Egg';
import LoginButton from '../../components/pages/login/LoginButton';
import { useUserIsCouple } from '../../hooks/queries/user.queries';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

const StyledP = styled.p`
  white-space: pre-wrap;
  text-align: center;
`;

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
    <PageContainer className="page-container">
      <LoginButton ment={MENT_LOGIN.PET_MEET} onClick={handleClick} />

      <StyledP className="text-gradient400">{MENT_LOGIN.PET_BIRTH}</StyledP>
      <Egg />
      <Wave />
    </PageContainer>
  );
}

export default observer(LoginPetBornPage);
