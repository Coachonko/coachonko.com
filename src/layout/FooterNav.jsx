import { component } from '@dark-engine/core'

import LanguageSelector from '../components/LanguageSelector'

const FooterNav = component(() => {
  return (
    <nav>
      <LanguageSelector />
    </nav>
  )
})

export default FooterNav
