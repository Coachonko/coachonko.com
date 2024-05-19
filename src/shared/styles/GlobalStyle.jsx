import { createGlobalStyle } from '@dark-engine/styled'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 100%;
    background-color: ${props => props.theme.white};
    overflow-y: hidden;
  }

  #dark-root {
    isolation: isolate;
  }

  /*
  *
  * typography
  *
  */
  html {
    font-size: 100%;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-rendering: optimizeLegibility;
    color: ${props => props.theme.black};
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

export default GlobalStyle
