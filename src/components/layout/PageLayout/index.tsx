import { Outlet } from 'react-router-dom';
import * as S from './PageLayout.styled';

const PageLayout = () => {
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
};

export default PageLayout;
