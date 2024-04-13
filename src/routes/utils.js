import { detectIsString, detectIsNull, detectIsEmpty } from '@dark-engine/core'

import { baseRoutes } from './baseRoutes'
import { languages, defaultLanguage, isAlternateLanguage } from '../translations'

// languageFromPathname returns the language from the pathname obtained with the useLocation hook.
// If the pathname does not match any valid language, defaultLanguage is returned.
export function languageFromPathname (pathname) {
  for (let i = 0, len = languages.length; i < len; i++) {
    const language = languages[i]
    if (pathname.startsWith(`/${language}`)) {
      return language
    }
  }
  return defaultLanguage
}

// getCurrentLanguage returns the language of the route.
// If currentRoute is `null`, returns default language.
// If currentPath is provided, the language is extracted by the path.
export function getCurrentLanguage (currentRoute, currentPath) {
  if (detectIsNull(currentRoute)) {
    if (detectIsEmpty(currentPath)) {
      return defaultLanguage
    }
    return languageFromPathname(currentPath)
  }

  const currentLanguage = currentRoute.language
  return currentLanguage
}

// getBasePathname removes the language prefix from a pathname if it is present.
export function getBasePathname (pathname) {
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]
    const pathPrefix = `/${language}/`
    if (pathname.startsWith(pathPrefix)) {
      return pathname.substring(pathPrefix.length - 1)
    }
  }
  return pathname
}

// matchBaseRoute returns a baseRoute if path matches baseRoute.path. Returns null otherwise.
export function matchBaseRoute (pathname) {
  for (let i = 0, len = baseRoutes.length; i < len; i++) {
    const route = baseRoutes[i]
    const basePathname = getBasePathname(pathname)
    if (basePathname === route.path) {
      return route
    }
  }
  return null
}

// getHomePath returns the home path for the given language
// Returns `/${language}/` for alternate languages.
// Returns `/` for defaultLanguage and unsupported languages.
export function getHomePath (language) {
  if (!detectIsString(language)) {
    throw new Error('language must be a string')
  }

  if (isAlternateLanguage(language)) {
    return `/${language}/`
  }

  return '/'
}

// getAlternatePaths returns all paths for a translated route.
// Paths returned are absolute.
export function getAlternatePaths (currentBaseRoute) {
  const result = {}
  const basePath = currentBaseRoute.path
  result[defaultLanguage] = `${basePath}`
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]
    result[language] = `/${language}${basePath}`
  }
  return result
}
