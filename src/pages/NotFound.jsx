import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

import withAppRoute from '../components/withAppRoute'
import LanguageSelector from '../components/LanguageSelector'

const NotFound = component(() => {
  const { t } = useTranslation()
  // translator uses language from html tag, which is set to english by default. Server has to handle it.
  return (
    <main>
      <LanguageSelector />
      {t('notFound.title')}
    </main>
  )
})

export default withAppRoute(NotFound)
