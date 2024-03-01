import styled from 'styled-components';

export const StyledImg = styled.img<{ isActive: boolean }>`
  width: 32px;
  height: 32px;
  /* FIXME: safari에서 작동잘안함 */
  filter: ${(props) => (props.isActive ? 'grayscale(0)' : 'grayscale(1)')};
`;
