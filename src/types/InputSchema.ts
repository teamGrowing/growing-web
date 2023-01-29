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

export default albumSchema;
