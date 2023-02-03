import fetcher from '.';
import { KakaoCodeDto } from '../types/auth/KakaoCode.dto';
import { LogInResultDto } from '../types/auth/LogInResult.dto';

export const AUTH_API = {
  login: (data: KakaoCodeDto) =>
    fetcher.create().post<LogInResultDto>('auth/log-in', data),
};

export default { AUTH_API };
