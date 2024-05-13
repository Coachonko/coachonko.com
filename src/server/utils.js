import { detectIsNull, detectIsUndefined } from '@dark-engine/core'

import { metaContent } from './metaContent'
import it from '../shared/translations/messages/it'
import en from '../shared/translations/messages/en'

export function pathnameHasMeta (pathname) {
  if (pathname === '/') {
    return 'home'
  }

  const metaKey = pathname.substring(pathname.lastIndexOf('/') + 1)
  if (metaContent[metaKey]) {
    return metaKey
  }
  return null
}

// routeHasMeta returns the key of the meta object if the route has meta data. Returns null otherwise.
export function routeHasMeta (routePath, mergedRoutePath) {
  if (routePath === '' && mergedRoutePath === '/') {
    return 'home'
  }

  if (detectIsUndefined(metaContent[routePath])) {
    return null
  }
  return routePath
}

export function getMeta (metaKey, language, name) {
  const fallback = metaContent.fallback[name]
  if (detectIsNull(metaKey)) {
    return fallback
  }

  const seoObject = metaContent[metaKey]
  const inLanguage = seoObject[language]
  if (detectIsUndefined(inLanguage)) {
    return fallback
  }

  const match = inLanguage[name]
  if (detectIsUndefined(match)) {
    return fallback
  }
  return match
}

export function getMessagesSync (lang) {
  if (lang === 'it') {
    return it
  }

  // fallback language
  return en
}
