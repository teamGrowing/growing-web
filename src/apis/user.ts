import { ChangeUserDto } from 'types/user/CangeUser.dto';
import { ChangeUserPhotoDto } from 'types/user/ChangeUserPhoto.dto';
import { CreatePassword } from 'types/user/CreatePassword.dto';
import { EmojiLineDto } from 'types/user/EmojiLine.dto';
import { EmojiPackageLineDto } from 'types/user/EmojiPackageLine.dto';
import { ResultDto } from 'types/user/Result.dto';
import { UserDto } from 'types/user/User.dto';
import { VerifyCodeDto } from 'types/user/VerifyCode.dto';
import { VerifyCodeResponseDto } from 'types/user/VerifyCodeResponse.dto';
import { VerifyPassword } from 'types/user/VerifyPassword.dto';
import fetcher from './fetcher';

export const USER_API = {
  getUser: (userId: string) => fetcher.create().get<UserDto>(`users/${userId}`),
  getUserIsCouple: (userId: string) =>
    fetcher.create().get<ResultDto>(`users/${userId}/is-couple`),
  getEmojis: (userId: string) =>
    fetcher.create().get<EmojiPackageLineDto[]>(`users/${userId}/emojis`),
  getEmojiDetail: (userId: string, emojiId: string) =>
    fetcher.create().get<EmojiLineDto[]>(`users/${userId}/emojis/${emojiId}`),
  patchUser: (userId: string, data: ChangeUserDto) =>
    fetcher.create().patch(`users/${userId}/update`, data),
  putProfilePhoto: (userId: string, data: ChangeUserPhotoDto) =>
    fetcher.create().put(`users/${userId}/profile-photos`, data),
  postCodeVerify: (data: VerifyCodeDto) =>
    fetcher.create().post<VerifyCodeResponseDto>(`users/codes/verify`, data),
  postPwdCreate: (userId: string, data: CreatePassword) =>
    fetcher.create().post(`users/${userId}/passwords/create`, data),
  postPwdVerify: (userId: string, data: VerifyPassword) =>
    fetcher.create().post(`users/${userId}/passwords/verify`, data),
};

export default { USER_API };
