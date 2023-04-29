import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --navbar-height: 52px;
  --topbar-height: 48px;
  --min-chat-textarea-height: calc(constant(safe-area-inset-bottom) + 24px);
  --min-chat-textarea-height: calc(env(safe-area-inset-bottom) + 24px);
}
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
*,
*::before,
*::after {
  font-family: PretendardLight;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color:rgba(255,255,255,0);
  /* Keyword values */
  -webkit-touch-callout: default;
  -webkit-touch-callout: none;
  /* Global values */
  -webkit-touch-callout: initial;
  -webkit-touch-callout: inherit;
  -webkit-touch-callout: unset;
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
  color: black;
}
input {
  border: none;
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  height: 100vh;

  padding-top: calc(constant(safe-area-inset-top) + 16px); // IOS 11.0 버전
  padding-top: calc(env(safe-area-inset-top) + 16px); // IOS 11.0 이상
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.page-container.with-navbar {
  height: calc(100vh - 52px);
}
.page-container.with-topbar {
  padding-top: calc(var(--topbar-height) + constant(safe-area-inset-top));
  padding-top: calc(var(--topbar-height) + env(safe-area-inset-top));
}


/* 웹에서 스크롤바 숨기기 */
.hidden-scrollbar {
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar { /*Chrome */
    display: none;
  }
}

/* swiper theme */
.swiper-button-next,
.swiper-button-prev {
  color: white;
  ::after {
  font-size: 24px;
  }
}
.swiper-pagination-fraction {
  left: 50%;
  transform: translateX(-50%);

  padding: 2px 6px;
  width: max-content;

  background-color: #00000070;
  border-radius: 10px;

  font-size: 12px;
  color: white;
}
`;

export default GlobalStyle;
