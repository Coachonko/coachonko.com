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
    path: 'contact',
    component: lazy(() => import('../pages/Contact'))
  },
  {
    path: 'not-found',
    component: lazy(() => import('../pages/NotFound'))
  }
]
