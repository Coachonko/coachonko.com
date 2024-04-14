import { component } from '@dark-engine/core'

import LanguageSelector from './LanguageSelector'
import { useTranslation } from '@wareme/translations'

const FooterNav = component(() => {
  const { t } = useTranslation()
  return (
    <nav>
      {t('languageSelector.test')}
      <LanguageSelector />
    </nav>
  )
})

export default FooterNav
