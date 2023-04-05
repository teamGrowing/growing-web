import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import fetcher from '../services';
import FullScreenLoader from '../components/common/FullScreenLoader';
import store from '../stores/RootStore';

type AuthTestResponseDto = {
  userId: string;
  accessToken: string;
};

// FIXME: 🚫 임시로 자동 로그인되는 페이지 만들어놨습니다!

function Login() {
  const { userStore } = store;
  const navigation = useNavigate();
  const userId = process.env.REACT_APP_TEST_ID;
  const dto = {
    userId,
  };
  const { mutate } = useMutation(
    () => fetcher.create().post<AuthTestResponseDto>('auth/test', dto),
    {
      onSuccess(res) {
        if (!userId) {
          throw Error('not exist user id!!!');
        }
        fetcher.setAccessToken(res.data.accessToken);
        userStore.getUserData(userId).then(() => {
          navigation('/', { replace: true });
        });
      },
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  return <FullScreenLoader />;
}

export default Login;
