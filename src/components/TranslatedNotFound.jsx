import { component, useEffect } from '@dark-engine/core'
import { useLocation, useHistory } from '@dark-engine/web-router'

import withAppRoute from '../components/withAppRoute'
import { getLanguageFromPathname } from '../routes'
import { defaultLanguage } from '../translations'

const TranslatedNotFound = component(() => {
  const { pathname } = useLocation()
  let redirectPath = '/not-found'
  const language = getLanguageFromPathname(pathname)
  if (language !== defaultLanguage) {
    redirectPath = `${language}${redirectPath}`
  }
  const history = useHistory()

  useEffect(() => { // TODO learn proper use of useEffect
    history.replace(redirectPath)
  }, [])
  return null
})

export default withAppRoute(TranslatedNotFound)
