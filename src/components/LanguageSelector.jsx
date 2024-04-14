import { component, detectIsNull } from '@dark-engine/core'
import { RouterLink, useLocation } from '@dark-engine/web-router'
import { useTranslation } from '@wareme/translations'

import { getAlternatePaths, matchBaseRoute } from '../routes'
import { dynamicMessagesLoading } from '../translations'

const LanguageSelector = component(() => {
  const { pathname } = useLocation()
  const currentRoute = matchBaseRoute(pathname)
  if (detectIsNull(currentRoute)) {
    return null
  }

  const alternatePaths = getAlternatePaths(currentRoute)
  const { t, translator } = useTranslation()
  const handleLanguageChange = (event) => {
    // TODO works the first change, then breaks. Must be fixed.
    // Only affects <main>. Investigate further.
    const newLanguage = event.target.name
    dynamicMessagesLoading(translator, newLanguage)
  }

  const result = []
  for (const language in alternatePaths) {
    // mark active here if language === currentLanguage
    result.push(
      <RouterLink
        to={alternatePaths[language]}
        name={language}
        // className={}
        onClick={handleLanguageChange}
      >{language.toUpperCase()}
      </RouterLink>
    )
  }

  return (
    <>
      <p>{t('home.subtitle')}</p>
      {result}
    </>
  )
})

export default LanguageSelector
