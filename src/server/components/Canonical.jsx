import { component, detectIsNull } from '@dark-engine/core'

import { config } from '../../shared/config'
import { languages } from '../../shared/translations'
import { getAlternatePaths } from '../../shared/routes'

const Canonical = component(({ currentPath, metaKey, currentLanguage }) => {
  if (detectIsNull(metaKey)) {
    return null
  }

  const currentUrl = `${config.BASE_URL}${currentPath}`
  if (languages.length === 1) {
    return <link rel='canonical' href={currentUrl} />
  }

  const links = []
  links.push(<link rel='canonical' href={currentUrl} />)
  links.push(<link rel='alternate' hreflang={currentLanguage} href={currentUrl} />)

  const alternatePaths = getAlternatePaths(currentPath)
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
