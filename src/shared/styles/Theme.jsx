import { component, useState } from '@dark-engine/core'
import { ThemeProvider } from '@dark-engine/styled'

import GlobalStyle from './GlobalStyle'

export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1500px'
}

const spacing = {
  headerHeight: '3rem',
  headedrHeightSm: '4.5rem'
}

export const zIndex = {
  zHeader: 1
}

const lightColors = {
  white: '#f6f2ef',
  black: '#1e1f1f',
  blue: '#1b4c95',
  green: '#135b41',
  red: '#943b2b'
}

const light = {
  ...lightColors,
  borderStyle: `solid 1px ${lightColors.black}`,
  ...breakpoints,
  ...spacing,
  ...zIndex
}

const Theme = component(({ slot }) => {
  const [selectedTheme, setSelectedTheme] = useState(light)
  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      {slot}
    </ThemeProvider>
  )
})

export default Theme
