import { component } from '@dark-engine/core'
import { Router } from '@dark-engine/web-router'
import { TranslationsProvider } from '@wareme/translations'

import { routes } from '../routes'

const App = component(({ currentPath, translator }) => {
  return (
    <TranslationsProvider translator={translator}>
      <Router routes={routes} url={currentPath}>
        {slot => slot}
      </Router>
    </TranslationsProvider>
  )
})

export default App
