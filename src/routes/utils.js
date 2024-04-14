import { detectIsString } from '@dark-engine/core'

import { baseRoutes } from './baseRoutes'
import { languages, defaultLanguage, isAlternateLanguage } from '../translations'

// getBasePathname removes the language prefix from a pathname if it is present.
// It also handles the pathname of homepages, in which the prefix is the whole pathname.
export function getBasePathname (pathname) {
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]

    // handle pathname from a homepage
    // homepage path in the default language is /
    // in alternate language it does not have a trailing slash
    const homePath = `/${language}`
    if (pathname === '/' || pathname === homePath) {
      return '/'
    }

    const pathPrefix = `${homePath}/`
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
  result[defaultLanguage] = basePath
  if (basePath === '/') {
    for (let i = 1, len = languages.length; i < len; i++) {
      const language = languages[i]
      result[language] = `/${language}`
    }
  } else {
    for (let i = 1, len = languages.length; i < len; i++) {
      const language = languages[i]
      result[language] = `/${language}${basePath}`
    }
  }
  return result
}
