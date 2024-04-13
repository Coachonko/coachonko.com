import { lazy } from '@dark-engine/core'

// mark a route with `translated` to register translated paths.
// add a `seo` string to generate SEO-optimized head elements on the server.
export const baseRoutes = [
  {
    path: '/',
    pathMatch: 'full',
    component: lazy(() => import('../pages/Home')),
    translated: true,
    seo: 'home'
  },
  {
    path: '/contact',
    pathMatch: 'full',
    component: lazy(() => import('../pages/Contact')),
    translated: true,
    seo: 'contact'
  },
  {
    path: '/not-found',
    pathMatch: 'full',
    component: lazy(() => import('../pages/NotFound')),
    translated: true
  },
  {
    path: '**',
    component: lazy(() => import('../components/TranslatedNotFound'))
  }
]
