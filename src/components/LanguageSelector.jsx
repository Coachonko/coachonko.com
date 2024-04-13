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

  const { translator } = useTranslation()

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

  // despite alternatePaths being resolved correctly the following things happen:
  // to prop is rendered wrong: leads to wrong paths
  // the link doesn't work
  // the link triggers a full page refresh
  //
  // it looks like I can't go from /it/contact to /contact, or from /it to /
  // to reproduce: request / -> click RouterLink to /it. Notice a full page refresh
  // then links to english pages do not work
  return result
})

export default LanguageSelector
