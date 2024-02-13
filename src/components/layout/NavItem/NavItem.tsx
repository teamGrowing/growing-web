import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import * as S from './NavItem.styled';

type NavItemProp = {
  linkTo: string;
};

function NavItem({ children, linkTo }: PropsWithChildren<NavItemProp>) {
  return (
    <S.SVGStyle>
      <NavLink
        to={linkTo}
        className={({ isActive }) =>
          isActive
            ? `${S.ACTIVE_CLASSNAME} text-gradient400`
            : S.INACTIVE_CLASSNAME
        }
      >
        {children}
      </NavLink>
    </S.SVGStyle>
  );
}

export default NavItem;
