import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Cookies from 'js-cookie';
import store from 'stores/RootStore';
import { ImgLogo } from 'assets/image';
import Icon from 'components/common/Icon/Icon';
import { useKakaoLogin, useUserIsCouple } from 'hooks/queries/user.queries';
import fetcher from 'services';

const PageContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;

  background-color: ${({ theme }) => theme.color.white};

  overflow-y: hidden;
`;

const StyledLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -40%, 0);

  width: 220px;
  height: 220px;
  border-radius: 50%;
`;

const StyledButton = styled.button`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 16px 0;

  width: calc(100% - 32px);
  background: #fee500;
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 16px;
`;

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
    <PageContainer className="page-container">
      <StyledLogo src={ImgLogo} alt="logo" />
      <StyledButton onClick={handleLogin}>
        <Icon icon="IconTalk" themeColor="black" />
        카카오 로그인
      </StyledButton>
    </PageContainer>
  );
}

export default observer(LoginKakaoPage);
