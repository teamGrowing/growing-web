import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ACTIVE_CLASSNAME = 'gradient400';
const INACTIVE_CLASSNAME = 'gray300';

type NavItemProp = {
  linkTo: string;
};

const SVGStyle = styled.div`
  .${INACTIVE_CLASSNAME} > p {
    color: ${({ theme }) => theme.color.gray300};
  }
  .${INACTIVE_CLASSNAME} > svg {
    fill: ${({ theme }) => theme.color.gray300};
  }

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
`;

function NavItem({ children, linkTo }: PropsWithChildren<NavItemProp>) {
  return (
    <SVGStyle>
      <NavLink
        to={linkTo}
        className={({ isActive }) =>
          isActive ? `${ACTIVE_CLASSNAME} text-gradient400` : INACTIVE_CLASSNAME
        }
      >
        {children}
      </NavLink>
    </SVGStyle>
  );
}

export default NavItem;
