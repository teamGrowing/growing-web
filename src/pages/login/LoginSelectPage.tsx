import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { MENT_LOGIN } from '../../constants/ments';
import changeEmojiToSpan from '../../util/Text';
import store from '../../stores/RootStore';
import Wave from '../../components/pages/login/Wave';
import Egg from '../../components/pages/login/Egg';
import LoginButton from '../../components/pages/login/LoginButton';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};
`;

const WelcomeText = styled.div`
  font-family: 'PretendardMedium';
  text-align: center;

  white-space: pre-wrap;
  word-break: break-all;
`;

const MyCode = styled.p`
  font-family: 'PretendardMedium';
  font-size: 16px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  width: 100%;
`;

function LoginSelectPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  return (
    <PageContainer className="page-container">
      <WelcomeText
        className="text-gradient400"
        dangerouslySetInnerHTML={changeEmojiToSpan(MENT_LOGIN.WELCOME)}
      />
      <MyCode>나의 코드: {userStore.user?.code ?? ''}</MyCode>

      <Buttons>
        <LoginButton
          ment={MENT_LOGIN.SHARE}
          onClick={() => navigation('/login/create', { replace: true })}
        />
        <LoginButton
          ment={MENT_LOGIN.INVITED}
          onClick={() => navigation('/login/invited', { replace: true })}
        />
      </Buttons>
      <Egg />
      <Wave />
    </PageContainer>
  );
}

export default observer(LoginSelectPage);
