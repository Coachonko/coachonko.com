import { component } from '@dark-engine/core'

import GlobalStyle from '../styles/GlobalStyle'
import ChangeTitle from './ChangeTitle'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'
import AppLayout from '../layout/AppLayout'

const Root = component(({ slot }) => {
  return (
    <>
      <GlobalStyle />
      <ChangeTitle />
      <ScrollToTop />

      <PageTransition>
        <AppLayout>
          {slot}
        </AppLayout>
      </PageTransition>
    </>
  )
})

export default Root
