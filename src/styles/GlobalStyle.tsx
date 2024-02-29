import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
:root {
  --full-width: 780px;
  --vh: 1vh;
  --full-height: calc(var(--vh, 1vh) * 100);

  --safe-area-top: constant(safe-area-inset-top);
  --safe-area-top: env(safe-area-inset-top);

  --safe-area-bottom: constant(safe-area-inset-bottom);
  --safe-area-bottom: env(safe-area-inset-bottom);

  --navbar-height: 58px;
  --navbar-real-height: calc(var(--safe-area-bottom) + var(--navbar-height));

  --topbar-height: 48px;
  --topbar-real-height: calc(var(--safe-area-top) + var(--topbar-height));
  
  --min-chat-textarea-height: calc(var(--safe-area-bottom) + 24px);
  --min-chat-textarea-height: calc(env(safe-area-inset-bottom) + 24px);
}

${normalize}

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: var(--full-height);
  
  overflow: hidden;
  position: fixed;

  width: 100vw;
  max-width: var(--full-width);
  left: 50%;
  transform: translateX(-50%);
}

html.is-safari,
html.is-safari body {
 height: calc(var(--vh, 1vh) * 100);
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
img {
  -webkit-tap-highlight-color: transparent; /* iOS */
  tap-highlight-color: transparent; /* Android */
  -webkit-user-drag: none; /* iOS */
  user-drag: none; /* Chrome, Firefox */
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
  background: linear-gradient(130.11deg, #F38181 7.3%, #e56969 100%);
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
  --stop-color0: #F38181;
  --stop-color1: #e56969;
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
  height: var(--full-height); 

  padding-top: calc(constant(safe-area-inset-top) + 16px); // IOS 11.0 버전
  padding-top: calc(env(safe-area-inset-top) + 16px); // IOS 11.0 이상
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
