import { component, detectIsNull, detectIsUndefined } from '@dark-engine/core'

import { config } from '../../shared/config'

// https://ogp.me/
const OpenGraphMeta = component(({ metaKey, currentPath, currentLanguage, getMetaWithLanguage, title, description }) => {
  if (detectIsNull(metaKey)) {
    return null
  }

  const currentUrl = `${config.BASE_URL}${currentPath}`
  const ogTitle = getMetaWithLanguage('ogTitle') || title
  const ogType = getMetaWithLanguage('ogType')
  const ogImage = getMetaWithLanguage('image')
  // TODO ogImageAlt
  if (detectIsUndefined(ogTitle) || detectIsUndefined(ogType) || detectIsUndefined(ogImage)) {
    return null
  }

  const ogDescription = getMetaWithLanguage('ogDescription') || description
  const siteName = config.NAME
  return (
    <>
      <meta property='og:title' content={title} />
      <meta property='og:type' content={ogType} />
      <meta property='og:image' content={`${config.BASE_URL}/${ogImage}`} />
      <meta property='og:url' content={currentUrl} />

      <meta property='og:description' content={ogDescription} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={currentLanguage} />
    </>
  )
})

export default OpenGraphMeta
