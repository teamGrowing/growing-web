export type AlbumFormValues = {
  albumTitle: string;
  albumSubTitle: string;
};

export type CodeFormValues = {
  code: string;
};

export type ProfileFormValues = {
  nickname: string;
  birthday: string;
  anniversary: string;
};

export type SignUpFormValues = {
  nickname: string;
  birthday: string;
  anniversary: string;
};

export type PetFormValues = {
  name: string;
};

export const enum SignUpType {
  NICKNAME = 'nickname',
  BIRTHDAY = 'birthday',
  ANNIVERSARY = 'anniversary',
}
