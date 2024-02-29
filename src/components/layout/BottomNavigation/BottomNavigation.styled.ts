import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  background: ${(props) => props.theme.color.white};
  border-radius: 20px 20px 0 0;
  border-top: 1px solid ${(props) => props.theme.color.gray100};

  width: 100%;
  height: var(--navbar-real-height);
  padding-bottom: calc(var(--safe-area-bottom));
  max-width: var(--full-width);
`;

export const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 0;
`;

export const Label = styled.p`
  text-align: center;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;
