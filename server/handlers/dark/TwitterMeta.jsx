import { component, detectIsUndefined } from '@dark-engine/core'

import { config } from '../../../src/config'

// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
const TwitterMeta = component(({ currentRoute, getMetaWithLanguage, title, description }) => {
  const seoString = currentRoute.seo
  if (detectIsUndefined(seoString)) {
    return null
  }

  const twitterSite = config.TWITTER_USERNAME
  if (detectIsUndefined(twitterSite)) {
    return null
  }

  const twitterTitle = getMetaWithLanguage('twitterTitle') || title
  const twitterDescription = getMetaWithLanguage('twitterTitle') || description
  const twitterImage = getMetaWithLanguage('image')
  // TODO ogImageAlt

  return (
    <>
      <meta name='twitter:site' content={twitterSite} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:description' content={twitterDescription} />
      <meta name='twitter:title' content={twitterTitle} />
      <meta name='twitter:image' content={twitterImage} />
    </>
  )
})

export default TwitterMeta
