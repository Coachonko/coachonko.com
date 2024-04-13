import { component, detectIsUndefined, detectIsNull } from '@dark-engine/core'

import OpenGraphMeta from './OpenGraphMeta'
import TwitterMeta from './TwitterMeta'
import { getMeta } from './utils'

const Meta = component(({ currentRoute, title }) => {
  if (detectIsNull(currentRoute) || detectIsUndefined(currentRoute.seo)) {
    return <meta name='robots' content='noindex, nofollow' />
  }

  const description = getMeta(currentRoute, 'description')
  return (
    <>
      <meta name='description' content={description} />
      <TwitterMeta currentRoute={currentRoute} title={title} description={description} />
      <OpenGraphMeta currentRoute={currentRoute} title={title} description={description} />
    </>
  )
})

export default Meta
