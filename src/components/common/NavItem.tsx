import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ACTIVE_CLASSNAME = 'active';

type NavItemProp = {
  linkTo: string;
};

const SVGStyle = styled.div`
  .${ACTIVE_CLASSNAME} > svg path {
    stroke: ${({ theme }) => theme.color.pink600};
  }
  .${ACTIVE_CLASSNAME} > svg > path:last-of-type {
    fill: ${({ theme }) => theme.color.pink600};
    stroke: none;
  }
`;

function NavItem({ children, linkTo }: PropsWithChildren<NavItemProp>) {
  return (
    <SVGStyle>
      <NavLink
        to={linkTo}
        className={({ isActive }) => (isActive ? ACTIVE_CLASSNAME : '')}
      >
        {children}
      </NavLink>
    </SVGStyle>
  );
}

export default NavItem;
