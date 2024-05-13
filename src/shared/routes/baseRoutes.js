import { Fragment, lazy } from '@dark-engine/core'

// These paths are nested in the generation step, paths must not be absolute.
export const baseRoutes = [
  {
    path: '',
    component: lazy(() => import('../pages/Home'))
  },
  {
    path: 'services',
    component: Fragment,
    children: [
      {
        path: '',
        component: lazy(() => import('../pages/Services'))
      },
      {
        path: 'delivery',
        component: lazy(() => import('../pages/Delivery'))
      }
    ]
  },
  {
    path: 'about',
    component: lazy(() => import('../pages/About'))
  },
  {
    path: 'contact',
    component: lazy(() => import('../pages/Contact'))
  },
  {
    path: '/legal',
    component: lazy(() => import('../pages/Legal'))
  },
  {
    path: '/privacy',
    component: lazy(() => import('../pages/Privacy'))
  },
  {
    path: 'not-found',
    component: lazy(() => import('../pages/NotFound'))
  }
]
