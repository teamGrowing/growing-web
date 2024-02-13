import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Cookies from 'js-cookie';
import store from 'stores/RootStore';
import { ImgLogo } from 'assets/image';
import Icon from 'components/common/Icon/Icon';
import { useKakaoLogin, useUserIsCouple } from 'hooks/queries';
import fetcher from 'apis/fetcher';
import * as S from './LoginKakaoPage.styled';

function LoginKakaoPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];

  const handleLogin = () => {
    (window as any).Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT,
    });
  };

  const { data: isCouple } = useUserIsCouple({
    userId: userStore.user?.id ?? '',
    options: {
      enabled: !!userStore.user?.id,
      suspense: false,
    },
  });

  const { mutateAsync: kakaoLogin } = useKakaoLogin({
    options: {
      async onSuccess({ data }) {
        Cookies.set('refresh', data.refreshToken);
        fetcher.setAccessToken(data.accessToken);

        await userStore.getUserData(data.userId);
        userStore.setRefreshTimer();

        if (isCouple) {
          navigation('/', { replace: true });
        } else {
          navigation('/login/select', { replace: true });
        }
      },
    },
  });

  useEffect(() => {
    if (!KAKAO_CODE) return;

    kakaoLogin({
      code: KAKAO_CODE,
    });
  }, [KAKAO_CODE]);

  return (
    <S.PageContainer className="page-container">
      <S.StyledLogo src={ImgLogo} alt="logo" />
      <S.StyledButton onClick={handleLogin}>
        <Icon icon="IconTalk" themeColor="black" />
        카카오 로그인
      </S.StyledButton>
    </S.PageContainer>
  );
}

export default observer(LoginKakaoPage);
