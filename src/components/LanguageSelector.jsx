import { component, detectIsNull } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
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
  const { translator } = useTranslation()
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.name
    dynamicMessagesLoading(translator, newLanguage)
  }

  const result = []
  for (const language in alternatePaths) {
    // mark active here if language === currentLanguage
    result.push(
      <Link
        to={alternatePaths[language]}
        name={language}
        // className={}
        onClick={handleLanguageChange}
      >{language.toUpperCase()}
      </Link>
    )
  }

  return result
})

export default LanguageSelector
