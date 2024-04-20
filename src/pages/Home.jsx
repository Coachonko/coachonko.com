import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'
import { useInView } from '@wareme/intersection-observer'

const Home = component(() => {
  const { t } = useTranslation()
  const { ref, inView } = useInView()

  const bigBlock = []
  for (let i = 0; i < 20; i++) {
    bigBlock.push(<div>some space</div>)
    bigBlock.push(<p>{String(inView)}</p>)
  }
  return (
    <>
      <section>
        {bigBlock}
        <div ref={ref}>
          {t('home.component.one')}
        </div>
        div is inside viewport {inView}
        {bigBlock}
      </section>
    </>
  )
})

export default Home
