import { Fragment } from '@dark-engine/core/jsx-runtime'

import Root from '../layout/Root'
import { baseRoutes } from './baseRoutes'
import { languages } from '../translations'

// generateRoutes creates the final routes array.
// All routes are children of the Root component, which must be defined in ../components/Root.
// A `not-found` route must be defined, this is where the user is redirected when a page is not found.
// A route has the path prefixed with its language if it is not in the default language.
function generateRoutes (baseRoutes) {
  const alternateLanguageRoutes = []
  const notFound = {
    path: '**',
    redirectTo: 'not-found'
  }
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]
    alternateLanguageRoutes.push({
      path: language,
      component: Fragment,
      children: [
        ...baseRoutes,
        notFound
      ]
    })
  }
  return [
    {
      path: '/',
      component: Root,
      children: [
        ...baseRoutes,
        ...alternateLanguageRoutes,
        notFound
      ]
    }
  ]
}

export const routes = generateRoutes(baseRoutes)
