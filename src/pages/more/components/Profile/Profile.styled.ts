import styled from 'styled-components';

export const Circle = styled.div<{ imgUrl: string; border: boolean }>`
  width: ${({ border }) => (border ? '164px' : '138px')};
  height: ${({ border }) => (border ? '164px' : '138px')};

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  border: ${({ border }) => (border ? '2px' : '0px')} solid
    ${({ theme }) => theme.color.gray100};
  border-radius: 100px;
`;
