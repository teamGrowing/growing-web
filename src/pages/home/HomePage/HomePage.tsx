import { useEffect } from 'react';
import preventScroll from 'utils/utils';
import * as S from './HomePage.styled';
import Head from './components/Head';
import Pet from './components/Pet';

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
