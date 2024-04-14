import { component, useEffect } from '@dark-engine/core'
import { Link } from '@dark-engine/web-router'
import { useTranslation } from '@wareme/translations'

import { dynamicMessagesLoading } from '../translations'

const Home = component(() => {
  const { t, translator } = useTranslation()
  // 1. load /
  // chunk-9095ce2a27dc8497.js useTranslation rendered
  // Home.js:18 rerendered
  // chunk-9095ce2a27dc8497.js:49 subscribed to onLanguageChanged
  //
  // 2. click the IT link: rerenders twice <- unsubscribes (unmount), renders, subscribes (mount) event fires, then rerender again
  // chunk-9095ce2a27dc8497.js useTranslation rendered
  // Home.js:18 rerendered
  // chunk-9095ce2a27dc8497.js:50 unsubsribed with offLanguageChanged
  // chunk-9095ce2a27dc8497.js:49 subscribed to onLanguageChanged
  // chunk-9095ce2a27dc8497.js:47 onLanguageChanged fired
  // chunk-9095ce2a27dc8497.js:45 useTranslation rendered
  // Home.js:18 rerendered
  //
  // 3. click the EN link: home component rerenders once, translation does not update <- unsubscribes (unmount), render, subscribes (mount) after event fires
  // chunk-9095ce2a27dc8497.js useTranslation rendered
  // Home.js:18 rerendered
  // chunk-9095ce2a27dc8497.js:50 unsubsribed with offLanguageChanged
  // chunk-9095ce2a27dc8497.js:49 subscribed to onLanguageChanged
  //
  // 4. click the IT link: home component rerenders once, translation changes to wrong language <- same as above, renders with old t

  // The problem is that the component renders before the event fires, but subscribes after the event has already fired.
  // The log never shows 'onLanguageChanged fired' because while the event is fired, the component isn't listening.
  console.log('rerendered')

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.name
    dynamicMessagesLoading(translator, newLanguage)
  }
  return (
    <>
      <section>
        <div>test nav</div>
        <Link to='/' name='en' onClick={handleLanguageChange}>English</Link>_<Link to='/it' name='it' onClick={handleLanguageChange}>Italian</Link>
        <div>
          {t('home.component.one')}
        </div>
      </section>
    </>
  )
})

export default Home
