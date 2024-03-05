import * as S from './Profile.styled';

type Props = {
  imgUrl: string;
  border: boolean;
};

const Profile = ({ imgUrl, border }: Props) => {
  return <S.Circle imgUrl={imgUrl} border={border} />;
};

export default Profile;
