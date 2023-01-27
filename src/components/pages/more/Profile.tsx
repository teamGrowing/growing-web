import styled from 'styled-components';

const Circle = styled.div<{ imgUrl: string }>`
  position: absolute;
  width: 164px;
  height: 164px;
  left: calc(50% - 164px / 2 - 1.5px);
  top: calc(50% - 164px / 2 - 152.5px);

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  border: 2px solid ${({ theme }) => theme.color.white};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2));
  border-radius: 100px;
`;

type ProfileProps = {
  imgUrl: string;
};

function Profile({ imgUrl }: ProfileProps) {
  return <Circle imgUrl={imgUrl} />;
}

export default Profile;
