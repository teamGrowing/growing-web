import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ACTIVE_CLASSNAME = 'active';

type NavItemProp = {
  linkTo: string;
};

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

const SVGStyle = styled.div`
  .${ACTIVE_CLASSNAME} > svg path {
    stroke: url(#paint0_linear_450_1371);
  }
  .${ACTIVE_CLASSNAME} > svg > path:last-of-type {
    fill: url(#paint2_linear_450_1371);
    stroke: none;
  }
`;

export default NavItem;
