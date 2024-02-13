export interface ChangeUserDto {
  nickName?: string;
  birthDay?: Date;
}

export interface ChangeUserPhotoDto {
  imageId: string | null;
}

export interface CreatePassword {
  password: string;
}

export interface EmojiLineDto {
  id: string;
  name: string;
  imageUrl: string;
}

export interface EmojiPackageLineDto {
  id: string;
  name: string;
}

export interface ResultDto {
  result: boolean;
}

export interface UserDto {
  id: string;
  nickName: string;
  birthDay: Date;
  anniversaryDay: Date | null;
  imageUrl: string | null;
  coupleId: string | null;
  code: string;
}

export interface VerifyCodeDto {
  code: string;
}

export interface VerifyCodeResponseDto {
  partnerId: string | null;
}

export interface VerifyPassword {
  password: string;
}
