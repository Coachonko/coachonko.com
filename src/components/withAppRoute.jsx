import { component } from '@dark-engine/core'

import ChangeTitle from './ChangeTitle'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

const withAppRoute = (WrappedComponent) => {
  return component((props) => {
    return (
      <>
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
