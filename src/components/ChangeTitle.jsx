import { component, useEffect } from '@dark-engine/core'
import { useMatch } from '@dark-engine/web-router'

import { getRouteTitle } from '../translations'
import { matchBaseRoute } from '../routes'

const ChangeTitle = component(() => {
  const match = useMatch() // Note: useMatch must be used from within a route's slot.
  const currentRoute = matchBaseRoute(match.path)
  const title = getRouteTitle(currentRoute)
  useEffect(() => { document.title = title })
  return null
})

export default ChangeTitle
