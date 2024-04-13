import { detectIsNull, detectIsUndefined } from '@dark-engine/core'

import { metaContent } from './metaContent'
import it from '../../../src/translations/messages/it'
import en from '../../../src/translations/messages/en'

export function getMeta (route, language, name) {
  const fallback = metaContent.fallback[name]
  if (detectIsNull(route)) {
    return fallback
  }

  const seoString = route.seo
  if (detectIsUndefined(seoString)) {
    return fallback
  }

  const seoObject = metaContent[seoString]
  if (detectIsUndefined(seoObject)) {
    return fallback
  }

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
