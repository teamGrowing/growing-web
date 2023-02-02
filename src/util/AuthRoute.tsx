import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import fetcher from '../services';

function AuthRoute() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkUserToken() {
    const userToken = fetcher.accessToken;
    if (!userToken) {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    return setIsLoggedIn(true);
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
