import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MENT_LOGIN } from 'constants/ments';
import changeEmojiToSpan from 'util/Text';
import store from 'stores/RootStore';
import Wave from 'pages/login/components/Wave/Wave';
import Egg from 'pages/login/components/Egg/Egg';
import LoginButton from 'pages/login/components/LoginButton/LoginButton';
import * as S from './LoginSelectPage.styled';

function LoginSelectPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  return (
    <S.PageContainer className="page-container">
      <S.WelcomeText
        className="text-gradient400"
        dangerouslySetInnerHTML={changeEmojiToSpan(MENT_LOGIN.WELCOME)}
      />
      <S.MyCode>나의 코드: {userStore.user?.code ?? ''}</S.MyCode>

      <S.Buttons>
        <LoginButton
          ment={MENT_LOGIN.SHARE}
          onClick={() => navigation('/login/create', { replace: true })}
        />
        <LoginButton
          ment={MENT_LOGIN.INVITED}
          onClick={() => navigation('/login/invited', { replace: true })}
        />
      </S.Buttons>
      <Egg />
      <Wave />
    </S.PageContainer>
  );
}

export default observer(LoginSelectPage);
