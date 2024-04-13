import { component, detectIsNull } from '@dark-engine/core'

import { config } from '../../../src/config'
import { languages } from '../../../src/translations'
import { getAlternatePaths } from '../../../src/routes'

const Canonical = component(({ currentRoute, currentLanguage }) => {
  if (detectIsNull(currentRoute)) {
    return null
  }

  const currentUrl = `${config.BASE_URL}${currentRoute.path}`
  if (languages.length === 1) {
    return <link rel='canonical' href={currentUrl} />
  }

  const links = []
  links.push(<link rel='canonical' href={currentUrl} />)
  links.push(<link rel='alternate' hreflang={currentLanguage} href={currentUrl} />)

  const alternatePaths = getAlternatePaths(currentRoute)
  for (let i = 0, len = languages.length; i < len; i++) {
    const language = languages[i]
    if (language === currentLanguage) {
      continue
    }

    const translatedPath = alternatePaths[language]
    const translatedUrl = `${config.BASE_URL}${translatedPath}`
    links.push(<link rel='alternate' hreflang={language} href={translatedUrl} />)
  }

  return links
})

export default Canonical
