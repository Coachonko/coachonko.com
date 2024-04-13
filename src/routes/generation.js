import { detectIsUndefined } from '@dark-engine/core'

import { baseRoutes } from './routes'
import { languages, defaultLanguage } from '../translations'

function generateTranslatedPath (basePath, language) {
  if (basePath === '/') {
    return `/${language}`
  }
  return `/${language}${basePath}`
}

function generateTranslatedRoutes (baseRoute) {
  const result = []
  for (let i = 1, len = languages.length; i < len; i++) { // i = 1 to skip default language
    const basePath = baseRoute.path
    const language = languages[i]
    const translatedPath = generateTranslatedPath(basePath, language)
    result.push({
      ...baseRoute,
      path: translatedPath,
      language
    })
  }
  return result
}

// generateRoutes generates objects larger than those in baseRoutes.
// A route always contain a `language` property
// A route has the path prefixed with its language, if it is not in the default language.
function generateRoutes (baseRoutes) {
  const result = []
  for (let i = 0, len = baseRoutes.length; i < len; i++) {
    const route = baseRoutes[i]
    result.push({
      ...route,
      language: defaultLanguage
    })

    if (detectIsUndefined(route.translated) || languages.length === 1) {
      continue
    }

    result.push(...generateTranslatedRoutes(route))
  }
  return result
}

export const routes = generateRoutes(baseRoutes)
