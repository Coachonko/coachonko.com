import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const Home = component(() => {
  const { t } = useTranslation()

  return (
    <>
      <section>
        <div>
          {t('home.component.one')}
        </div>
      </section>
    </>
  )
})

export default Home
