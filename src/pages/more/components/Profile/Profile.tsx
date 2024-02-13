import * as S from './Profile.styled';

type ProfileProps = {
  imgUrl: string;
  border: boolean;
};

function Profile({ imgUrl, border }: ProfileProps) {
  return <S.Circle imgUrl={imgUrl} border={border} />;
}

export default Profile;
