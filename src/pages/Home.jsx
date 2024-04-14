import { component, useEffect } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const Home = component(() => {
  const { t } = useTranslation()

  // for some reason t changes twice on the first 2 changes, uses wrong language after first change
  // Is it related to loading messages?
  // This does not happen in <LanguageSelection /> for some reason
  useEffect(() => {
    console.log('useEffect with t')
  }, [t])

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
