export interface KakaoCodeDto {
  code: string;
}

export interface LogInResultDto {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponseDto {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface VerifyCodeDto {
  code: string;
}

export interface VerifyCodeResponseDto {
  partnerId: string | null;
}
