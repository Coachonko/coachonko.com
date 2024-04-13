import { lazy } from '@dark-engine/core'

// add a `seo` string to generate SEO-optimized head elements on the server.
export const baseRoutes = [
  {
    path: '/',
    component: lazy(() => import('../pages/Home')),
    seo: 'home'
  },
  {
    path: '/contact',
    component: lazy(() => import('../pages/Contact')),
    seo: 'contact'
  },
  {
    path: '/not-found',
    component: lazy(() => import('../pages/NotFound'))
  }
]
