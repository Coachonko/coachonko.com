import { component, detectIsNull } from '@dark-engine/core'
import { RouterLink, useMatch } from '@dark-engine/web-router'
import { useTranslation } from '@wareme/translations'

import { getAlternatePaths, matchRoute } from '../routes'
import { dynamicMessagesLoading } from '../translations'

const LanguageSelector = component(() => {
  const { path } = useMatch()

  const currentPath = path
  const currentRoute = matchRoute(currentPath)
  if (detectIsNull(currentRoute)) {
    return null
  }

  const alternatePaths = getAlternatePaths(currentRoute)
  if (detectIsNull(alternatePaths)) {
    return null
  }

  const { t, translator } = useTranslation('languageSelector')

  const handleLanguageChange = (event) => {
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

  result.push(<p>{t('test')}</p>)
  return result
})

export default LanguageSelector
