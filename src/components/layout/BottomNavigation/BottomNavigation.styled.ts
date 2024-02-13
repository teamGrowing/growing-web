import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  max-width: 780px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const NavItems = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  isolation: isolate;

  position: absolute;
  width: 100%;
  left: -1px;
  bottom: 0px;

  background: ${(props) => props.theme.color.white};
  border-top: 1px solid ${(props) => props.theme.color.gray100};
`;
export const Label = styled.p`
  text-align: center;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;
