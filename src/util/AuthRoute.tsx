import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import fetcher from '../services';
import AUTH_API from '../services/auth.service';
import store from '../stores/RootStore';
import { USER_API } from '../services/user.service';

function AuthRoute() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userStore } = store;

  async function checkUserToken() {
    const token = Cookies.get('refresh');

    if (token) {
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
    } else {
      setIsLoggedIn(false);
      navigate('/login/kakao', { replace: true });
    }
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Outlet />;
  }

  return null;
}

export default AuthRoute;
