import { component, detectIsUndefined } from '@dark-engine/core'

import { config } from '../../../src/config'
import { getMeta } from './utils'

// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
const TwitterMeta = component(({ currentRoute, title, description }) => {
  const twitterSite = config.TWITTER_USERNAME
  if (detectIsUndefined(twitterSite)) {
    return null
  }

  const twitterTitle = getMeta(currentRoute, 'twitterTitle') || title
  const twitterDescription = getMeta(currentRoute, 'twitterTitle') || description
  const twitterImage = getMeta(currentRoute, 'image')
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
