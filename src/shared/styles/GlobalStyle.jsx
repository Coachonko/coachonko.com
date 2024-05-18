import { createGlobalStyle } from '@dark-engine/styled'

import { typographyCSS } from './typography'
import { colors } from './constants'

const GlobalStyle = createGlobalStyle`
  :root{
    --border-style: solid 1px ${colors.black};
    --brand-height: 2vw;
    --header-padding: 6vw;
  }
  
  ${typographyCSS}
  
  body {
    margin: 0;
    min-height: 100%;
    background-color: ${colors.white};
    overflow-y: hidden;
  }
`

export default GlobalStyle
