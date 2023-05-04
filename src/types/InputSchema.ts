import * as yup from 'yup';

export type AlbumFormValues = {
  albumTitle: string;
  albumSubTitle: string;
};
const albumSchema = yup.object().shape({
  albumTitle: yup
    .string()
    .required('제목을 입력해주세요!')
    .max(15, '15글자 이하로 입력해주세요!'),
  albumSubTitle: yup.string().max(10, '10글자 이하로 입력해주세요!'),
});

export default albumSchema;

export type ProfileFormValues = {
  nickname: string;
  birthday: string;
  anniversary: string;
};

export const profileSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('애칭을 입력해주세요!')
    .max(10, '10글자 이하로 입력해주세요!'),
  birthday: yup.string().required('생년월일을 입력해주세요!'),
  anniversary: yup.string().required('기념일을 입력해주세요!'),
});

export type CodeFormValues = {
  code: string;
};

export const codeSchema = yup.object().shape({
  code: yup.string().required('코드를 입력해주세요!'),
});

export type SignUpFormValues = {
  nickname: string;
  birthday: string;
  anniversary: string;
};

export const enum SignUpType {
  NICKNAME = 'nickname',
  BIRTHDAY = 'birthday',
  ANNIVERSARY = 'anniversary',
}

export const signUpSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('애칭을 입력해주세요!')
    .max(10, '10글자 이하로 입력해주세요!'),
  birthday: yup.string().required('생년월일을 입력해주세요!'),
  anniversary: yup.string().required('기념일을 입력해주세요!'),
});

export type PetFormValues = {
  name: string;
};

export const petSchema = yup.object().shape({
  name: yup
    .string()
    .required('이름을 입력하지 않았어요!')
    .max(6, '최대 6글자까지 가능합니다.'),
});
