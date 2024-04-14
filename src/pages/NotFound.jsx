import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const NotFound = component(() => {
  const { t } = useTranslation()
  return (
    <section>
      {t('notFound.title')}
    </section>
  )
})

export default NotFound
