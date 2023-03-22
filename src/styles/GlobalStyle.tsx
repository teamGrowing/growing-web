import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
textarea {
  border: none;
  outline: none;
  resize: none;
}
.text-gradient300 {
  background: linear-gradient(130.11deg, #FCE38A 7.3%, #F38181 100%);
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
/* page container 관련 */
.page-container {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
.page-container.with-navbar {
  height: calc(var(--vh, 1vh) * 100 - 81px);
}
.page-container.with-topbar {
  padding-top: 49px;
}


/* 웹에서 스크롤바 숨기기 */
.hidden-scrollbar {
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar { /*Chrome */
    display: none;
  }
}
`;

export default GlobalStyle;
