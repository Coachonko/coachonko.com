import { component, detectIsUndefined } from '@dark-engine/core'

import { config } from '../../../src/config'

// https://ogp.me/
const OpenGraphMeta = component(({ currentRoute, currentLanguage, getMetaWithLanguage, title, description }) => {
  const seoString = currentRoute.seo
  if (detectIsUndefined(seoString)) {
    return null
  }

  const currentUrl = `${config.BASE_URL}${currentRoute.path}`
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
      <meta property='og:image' content={`${config.BASE_URL}/public/${ogImage}`} />
      <meta property='og:url' content={currentUrl} />

      <meta property='og:description' content={ogDescription} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={currentLanguage} />
    </>
  )
})

export default OpenGraphMeta
