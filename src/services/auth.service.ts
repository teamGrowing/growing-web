import axios, { AxiosRequestConfig } from 'axios';
import { KakaoCodeDto } from 'types/auth/KakaoCode.dto';
import { LogInResultDto } from 'types/auth/LogInResult.dto';
import { RefreshResponseDto } from 'types/auth/RefreshResponse.dto';
import fetcher from '.';

const AUTH_API = {
  login: (data: KakaoCodeDto) =>
    fetcher.create().post<LogInResultDto>('auth/log-in', data),
  refresh: (token: string) => {
    const config: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_SERVER_HOST,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    };

    return axios.create(config).post<RefreshResponseDto>('auth/refresh');
  },
};

export default AUTH_API;
