import { component, useEffect } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'

import { getTitleFromPathname } from '../translations'

const ChangeTitle = component(() => {
  const { pathname } = useLocation()
  const title = getTitleFromPathname(pathname)
  useEffect(() => { document.title = title })
  return null
})

export default ChangeTitle
