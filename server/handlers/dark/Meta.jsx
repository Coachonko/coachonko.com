import { component, detectIsUndefined, detectIsNull } from '@dark-engine/core'

import OpenGraphMeta from './OpenGraphMeta'
import TwitterMeta from './TwitterMeta'
import { getMeta } from './utils'

const Meta = component(({ currentRoute, currentLanguage, title }) => {
  if (detectIsNull(currentRoute) || detectIsUndefined(currentRoute.seo)) {
    return <meta name='robots' content='noindex, nofollow' />
  }

  const getMetaWithLanguage = (name) => {
    return getMeta(currentRoute, currentLanguage, name)
  }

  const description = getMetaWithLanguage('description')
  return (
    <>
      <meta name='description' content={description} />
      <TwitterMeta
        currentRoute={currentRoute}
        getMetaWithLanguage={getMetaWithLanguage}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        currentRoute={currentRoute}
        currentLanguage={currentLanguage}
        getMetaWithLanguage={getMetaWithLanguage}
        title={title}
        description={description}
      />
    </>
  )
})

export default Meta
