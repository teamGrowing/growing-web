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
:root {
  --vh: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  height: var(--vh);
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
input {
  border: none;
  outline: none;
}
.text-gradient300 {
  background: linear-gradient(130.11deg, #FCE38A 7.3%, #F38181 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
  -webkit-text-fill-color: initial;
  }
}
.text-gradient400 {
  background: linear-gradient(130.11deg, #7117EA 7.3%, #EA6060 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
  -webkit-text-fill-color: initial;
  }
}
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* for svg */
.gradient400 {
  fill: url(#linear-gradient400);
}
#linear-gradient400 {
  --stop-color0: #7117ea;
  --stop-color1: #ea6060;
}
`;

export default GlobalStyle;
