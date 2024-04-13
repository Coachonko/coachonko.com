import { detectIsUndefined, detectIsNull } from '@dark-engine/core'

import { languages } from './languages'
import { titles } from './titles'

export const defaultLanguage = languages[0]

export function isSupportedLanguage (language) {
  for (let i = 0, len = languages.length; i < len; i++) {
    const supportedLanguage = languages[i]
    if (supportedLanguage === language) {
      return true
    }
  }
  return false
}

export function isAlternateLanguage (language) {
  for (let i = 1, len = languages.length; i < len; i++) {
    const alternateLanguage = languages[i]
    if (alternateLanguage === language) {
      return true
    }
  }
  return false
}

// browserGetTitle returns the document.title for the given seo string and language.
// Returns the fallback title if seostring is undefined, or title was not found for given language.
export function getTitle (seoString, language) {
  const fallbackTitle = titles.fallback
  if (detectIsUndefined(seoString)) {
    return fallbackTitle
  }

  const pageTitles = titles[seoString]
  if (detectIsUndefined(pageTitles)) {
    return fallbackTitle
  }

  const languageTitle = pageTitles[language]
  if (detectIsUndefined(languageTitle)) {
    return fallbackTitle
  }

  return languageTitle
}

// getRouteTitle returns the title of the given route.
export function getRouteTitle (route) {
  if (detectIsNull(route)) {
    return getTitle()
  }

  const seoString = route.seo
  if (detectIsUndefined(seoString)) {
    return getTitle()
  }

  return getTitle(seoString, route.language)
}

// Note: string literals are used so that Bun can import these files as assets.
// Otherwise a function for the server must be created and messages should be kept in the `public` directory.
export async function getMessages (lang) {
  if (lang === 'it') {
    const messages = await import('./messages/it.js')
    return messages.default
  }

  // fallback language
  const messages = await import('./messages/en.js')
  return messages.default
}

export async function dynamicMessagesLoading (translatorInstance, newLanguage) {
  const changeLanguage = translatorInstance.changeLanguage
  const localeData = translatorInstance.localeData
  // do not load anything if locale data was already loaded.
  for (let i = 0, len = localeData.length; i < len; i++) {
    if (localeData[i].language === newLanguage) {
      return changeLanguage(newLanguage)
    }
  }

  const messages = await getMessages(newLanguage)
  changeLanguage(newLanguage, messages)
}
