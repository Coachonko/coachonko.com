import { component } from '@dark-engine/core'
// import { createGlobalStyle } from '@dark-engine/styled'

import ChangeTitle from './ChangeTitle'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

// const GlobalStyle = createGlobalStyle``

const withAppRoute = (WrappedComponent) => {
  return component((props) => {
    return (
      <>
        {/* <GlobalStyle /> */}
        <ChangeTitle />
        <ScrollToTop />
        <Navigation>
          <WrappedComponent {...props} />
        </Navigation>
      </>
    )
  })
}

export default withAppRoute
