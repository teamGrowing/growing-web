import { createGlobalStyle } from 'styled-components';
import PretendardBold from '../assets/fonts/PretendardBold.woff';
import PretendardExtraBold from '../assets/fonts/PretendardExtraBold.woff';
import PretendardLight from '../assets/fonts/PretendardLight.woff';
import PretendardMedium from '../assets/fonts/PretendardMedium.woff';
import PretendardRegular from '../assets/fonts/PretendardRegular.woff';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'PretendardLight';
  font-weight: 300;
  font-size: normal;
  src: url(${PretendardLight}) format('woff');
}
@font-face {
  font-family: 'PretendardRegular';
  font-weight: 400;
  src: url(${PretendardRegular}) format('woff');
}
@font-face {
  font-family: 'PretendardMedium';
  font-weight: 500;
  font-size: normal;
  src: url(${PretendardMedium}) format('woff');
}
@font-face {
  font-family: 'PretendardBold';
  font-weight: 700;
  font-size: normal;
  src: url(${PretendardBold}) format('woff');
}
@font-face {
  font-family: 'PretendardExtraBold';
  font-weight: 800;
  font-size: normal;
  src: url(${PretendardExtraBold}) format('woff');
}
body {
  width:100%;
  height:100%;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
  font-family: PretendardLight;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a,
a:hover,
a:active {
  text-decoration: none;
}
button {
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
}
`;

export default GlobalStyle;
