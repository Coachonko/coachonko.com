import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const NotFound = component(() => {
  const { t } = useTranslation()
  return (
    <>
      {t('notFound.title')}
    </>
  )
})

export default NotFound
