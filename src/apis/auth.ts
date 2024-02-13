import axios, { AxiosRequestConfig } from 'axios';
import { KakaoCodeDto, LogInResultDto, RefreshResponseDto } from 'models/auth';
import fetcher from './fetcher';

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
