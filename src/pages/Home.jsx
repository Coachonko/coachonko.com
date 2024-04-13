import { component } from '@dark-engine/core'

import withAppRoute from '../components/withAppRoute'
import LanguageSelector from '../components/LanguageSelector'

const Home = component(() => {
  return (
    <main>
      <LanguageSelector />
    </main>
  )
})

export default withAppRoute(Home)
