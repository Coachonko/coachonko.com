import { component, detectIsNull } from '@dark-engine/core'

import OpenGraphMeta from './OpenGraphMeta'
import TwitterMeta from './TwitterMeta'
import { getMeta } from './utils'

const Meta = component(({ currentPath, metaKey, currentLanguage, title }) => {
  if (detectIsNull(metaKey)) {
    return <meta name='robots' content='noindex, nofollow' />
  }

  const getMetaWithLanguage = (name) => {
    return getMeta(metaKey, currentLanguage, name)
  }

  const description = getMetaWithLanguage('description')
  return (
    <>
      <meta name='description' content={description} />
      <TwitterMeta
        metaKey={metaKey}
        getMetaWithLanguage={getMetaWithLanguage}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        metaKey={metaKey}
        currentPath={currentPath}
        currentLanguage={currentLanguage}
        getMetaWithLanguage={getMetaWithLanguage}
        title={title}
        description={description}
      />
    </>
  )
})

export default Meta
