import { component } from '@dark-engine/core'
import { createGlobalStyle } from '@dark-engine/styled'

import ChangeTitle from './ChangeTitle'
import ScrollToTop from './ScrollToTop'
import HeaderNav from './HeaderNav'
import Copyright from './Copyright'
import FooterNav from './FooterNav'

const GlobalStyle = createGlobalStyle``

const Root = component(({ slot }) => {
  return (
    <>
      <GlobalStyle />
      <ChangeTitle />
      <ScrollToTop />
      <header>
        <HeaderNav />
      </header>
      <main>
        {slot}
      </main>
      <footer>
        <FooterNav />
        <Copyright />
      </footer>
    </>
  )
})

export default Root
