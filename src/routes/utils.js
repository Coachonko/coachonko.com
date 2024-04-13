import { detectIsUndefined, detectIsString, detectIsNull, detectIsEmpty } from '@dark-engine/core'

import { routes } from './generation'
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

// matchRoute returns a superRoute if path matches superRoute.path exactly. Returns null otherwise.
export function matchRoute (path) {
  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i]
    if (path === route.path) {
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

function getBasePath (currentRoute) {
  const currentPath = currentRoute.path
  const currentLanguage = currentRoute.language
  if (currentLanguage === defaultLanguage) {
    return currentPath
  }

  const numberOfCharacters = `/${currentLanguage}`.length
  const basePath = currentPath.slice(numberOfCharacters)
  return basePath
}

// getAlternatePaths returns all paths for a translated route.
// Paths returned are absolute.
// Returns `null` if route is not translated.
export function getAlternatePaths (currentRoute) {
  if (detectIsUndefined(currentRoute.translated)) {
    return null
  }

  const result = {}
  const basePath = getBasePath(currentRoute)
  result[defaultLanguage] = `/${basePath}`
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]
    result[language] = `/${language}/${basePath}`
  }
  return result
}
