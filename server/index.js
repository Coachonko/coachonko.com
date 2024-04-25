import Elysia from 'elysia'

import { dark } from './handlers/dark'
import { tryFiles } from './handlers/tryFiles'

new Elysia()
  .get('*', ctx => {
    if (process.env.BUN_ENV === 'production') {
      return dark(ctx)
    }
    return tryFiles(ctx, 'build', dark)
  })
  .on('start', () => console.log(`Running on port ${process.env.PORT}`))
  .listen(process.env.PORT)
