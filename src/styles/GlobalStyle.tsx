import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
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
input {
  border: none;
  outline: none;
}
.text-gradient300 {
  background: linear-gradient(130.11deg, #FCE38A 7.3%, #F38181 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
.text-gradient400 {
  background: linear-gradient(130.11deg, #7117EA 7.3%, #EA6060 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
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
