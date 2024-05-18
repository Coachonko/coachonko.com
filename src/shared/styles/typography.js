import { css } from '@dark-engine/styled'

import { colors, breakpoints } from './constants'
/*
Fluid font sizes are beautiful but bad for accessibility: they do not scale correctly when the user
zooms in/out, and they do not respect the user (browser) preferences.
There are some fluid font approaches that utilize 1rem in the function to obtain a semi-accessible fluid
font size, but these approaches are not satisfactory enough.
The best approach for accessibility, for now, is to scale font size as percentages at given breakpoints.
*/

export const typographyCSS = css`
  @font-face {
    font-family: "ContempoGothic";
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src: url("/_public/fonts/Arkitype-ContempoGothic-Light.woff2") format("woff2");
  }

  @font-face {
    font-family: "ContempoGothic";
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url("/_public/fonts/Arkitype-ContempoGothic-Regular.woff2")
      format("woff2");
  }

  html {
    font-size: 100%;
  }

  body {
    font-family: "ContempoGothic";
    text-rendering: optimizeLegibility;
    color: ${colors.black};
    line-height: 1.5;
  }

  select,
  textarea,
  input, 
  button {
    font: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    overflow-wrap: break-word;
  }
`
