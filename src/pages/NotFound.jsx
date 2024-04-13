import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const NotFound = component(() => {
  const { t } = useTranslation()
  // translator uses language from html tag, which is set to english by default. Server has to handle it.
  return (
    <main>
      {t('notFound.title')}
    </main>
  )
})

export default NotFound
