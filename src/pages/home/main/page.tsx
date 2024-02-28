import { useEffect } from 'react';
import preventScroll from 'utils/utils';
import * as S from './page.styled';
import Head from './components/Head/Head';
import Pet from './components/Pet/Pet';

const HomePage = () => {
  useEffect(() => {
    preventScroll();
    sessionStorage.clear();
  }, []);

  return (
    <S.HomeContainer>
      <Head />
      <Pet />
    </S.HomeContainer>
  );
};

export default HomePage;
