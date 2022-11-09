import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const COLOR_PINK = "#FE3B6D";
const ACTIVE_CLASSNAME = "active";

type NavItemProp = {
  linkTo: string;
};

const NavItem = ({ children, linkTo }: PropsWithChildren<NavItemProp>) => {
  return (
    <SVGStyle>
      <NavLink
        to={linkTo}
        className={({ isActive }) => (isActive ? ACTIVE_CLASSNAME : "")}
      >
        {children}
      </NavLink>
    </SVGStyle>
  );
};

const SVGStyle = styled.div`
  .${ACTIVE_CLASSNAME} > svg path {
    stroke: ${COLOR_PINK};
  }
  .${ACTIVE_CLASSNAME} > svg > path:last-of-type {
    fill: ${COLOR_PINK};
    stroke: none;
  }
`;

export default NavItem;
