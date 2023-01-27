import styled, { css } from 'styled-components';

const Circle = styled.div<{ imgUrl: string; border: boolean }>`
  position: absolute;

  ${({ border }) =>
    border
      ? css`
          width: 164px;
          height: 164px;
          left: calc(50% - 164px / 2 - 1.5px);
          top: calc(50% - 164px / 2 - 152.5px);
        `
      : css`
          width: 138px;
          height: 138px;
          left: calc(50% - 138px / 2 - 2px);
          top: calc(50% - 138px / 2 - 191px);
        `}

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  border: ${({ border }) => (border ? '2px' : '0px')} solid
    ${({ theme }) => theme.color.white};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2));
  border-radius: 100px;
`;

type ProfileProps = {
  imgUrl: string;
  border: boolean;
};

function Profile({ imgUrl, border }: ProfileProps) {
  return <Circle imgUrl={imgUrl} border={border} />;
}

export default Profile;
