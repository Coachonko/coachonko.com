import { component } from '@dark-engine/core'
import { createGlobalStyle } from '@dark-engine/styled'

import ChangeTitle from './ChangeTitle'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

const GlobalStyle = createGlobalStyle``

const Root = component(({ slot }) => {
  console.log('root rendered')
  return (
    <>
      <GlobalStyle />
      <ChangeTitle />
      <ScrollToTop />
      <Navigation>
        {slot}
      </Navigation>
    </>
  )
})

export default Root
