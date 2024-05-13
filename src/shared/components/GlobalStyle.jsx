import { createGlobalStyle } from '@dark-engine/styled'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'ContempoGothic';
  font-weight: normal;
  font-style: normal;
  font-display: swap;
  src: url('/_public/fonts/Arkitype-ContempoGothic-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'ContempoGothic';
  font-weight: bold;
  font-style: normal;
  font-display: swap;
  src: url('/_public/fonts/Arkitype-ContempoGothic-Bold.woff2') format('woff2');
}

:root {
  --color-white: #f6f2ef;
  --color-black: #1e1f1f;
  --color-blue: #1b4c95;
  --color-green: #135b41;
  --color-red: #943b2b;
}

html {
  font-size: 100%;
  overflow-y: scroll;
}

body {
  margin: 0;
  min-height: 100%;
  background-color: var(--color-black);
  font-family: 'ContempoGothic';
  text-rendering: optimizeLegibility;
  color: var(--color-black);
}

select,
textarea,
input,
button {
  font: inherit;
}

select,
textarea,
input {
  letter-spacing: inherit;
  word-spacing: inherit;
}
`

export default GlobalStyle
