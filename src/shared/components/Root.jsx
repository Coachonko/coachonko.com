import { component } from '@dark-engine/core'

import Theme from '../styles/Theme'
import ChangeTitle from './ChangeTitle'
import PageTransition from './PageTransition'
import AppLayout from '../layout/AppLayout'

const Root = component(({ slot }) => {
  return (
    <Theme>
      <ChangeTitle />

      <PageTransition>
        <AppLayout>
          {slot}
        </AppLayout>
      </PageTransition>
    </Theme>
  )
})

export default Root
