import fetcher from '.';
import { ChangeUserDto } from '../types/user/CangeUser.dto';
import { ChangeUserPhotoDto } from '../types/user/ChangeUserPhoto.dto';
import { CreatePassword } from '../types/user/CreatePassword.dto';
import { EmojiLineDto } from '../types/user/EmojiLine.dto';
import { EmojiPackageLineDto } from '../types/user/EmojiPackageLine.dto';
import { ResultDto } from '../types/user/Result.dto';
import { UserDto } from '../types/user/User.dto';
import { VerifyCodeDto } from '../types/user/VerifyCode.dto';
import { VerifyCodeResponseDto } from '../types/user/VerifyCodeResponse.dto';
import { VerifyPassword } from '../types/user/VerifyPassword.dto';

export const USER_API = {
  getUser: (userId: string) => fetcher.get<UserDto>(`users/${userId}`),
  getUserIsCouple: (userId: string) =>
    fetcher.get<ResultDto>(`users/${userId}/is-couple`),
  getEmojis: (userId: string) =>
    fetcher.get<EmojiPackageLineDto[]>(`users/${userId}/emojis`),
  getEmojiDetail: (userId: string, emojiId: string) =>
    fetcher.get<EmojiLineDto[]>(`users/${userId}/emojis/${emojiId}`),
  patchUser: (userId: string, data: ChangeUserDto) =>
    fetcher.patch(`users/${userId}`, data),
  putProfilePhoto: (userId: string, data: ChangeUserPhotoDto) =>
    fetcher.put(`users/${userId}/profile-photos`, data),
  postCodeVerify: (userId: string, data: VerifyCodeDto) =>
    fetcher.post<VerifyCodeResponseDto>(`users/${userId}/codes/verify`, data),
  postPwdCreate: (userId: string, data: CreatePassword) =>
    fetcher.post(`users/${userId}/passwords/create`, data),
  postPwdVerify: (userId: string, data: VerifyPassword) =>
    fetcher.post(`users/${userId}/passwords/verify`, data),
};

export default { USER_API };
