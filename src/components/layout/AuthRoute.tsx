import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import fetcher from 'apis/fetcher';
import AUTH_API from 'apis/auth';
import { USER_API } from 'apis/user';
import store from 'stores/RootStore';

function AuthRoute() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userStore } = store;

  async function checkUserToken() {
    const token = Cookies.get('refresh');
    if (token) {
      try {
        const { data } = await AUTH_API.refresh(token);
        setIsLoggedIn(true);

        Cookies.set('refresh', data.refreshToken);
        fetcher.setAccessToken(data.accessToken);
        await userStore.getUserData(data.userId);
        userStore.setRefreshTimer();
        await USER_API.getUserIsCouple(data.userId).then((res) => {
          if (res.data.result) {
            navigate('/', { replace: true });
          } else {
            navigate('/login/select', { replace: true });
          }
        });
      } catch {
        Cookies.remove('refresh');
        setIsLoggedIn(false);
        navigate('/login/kakao', { replace: true });
      }
    } else {
      setIsLoggedIn(false);
      navigate('/login/kakao', { replace: true });
    }
  }

  useEffect(() => {
    async function checkMockingMode() {
      if (process.env.NODE_ENV !== 'development') {
        checkUserToken();
        return;
      }

      setIsLoggedIn(true);
      await userStore.getUserData('1');
      navigate('/', { replace: true });
    }

    checkMockingMode();
  }, [isLoggedIn]);

  if (isLoggedIn && userStore.user) {
    return <Outlet />;
  }

  return null;
}

export default AuthRoute;
