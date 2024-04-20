import Elysia from 'elysia'

import { dark } from './handlers/dark'
import { tryFiles } from './handlers/tryFiles'

const app = new Elysia()

if (process.env.BUN_ENV === 'production') {
  app.get('*', (ctx) => dark(ctx))
} else {
  app.get('*', (ctx) => tryFiles(ctx, 'build', dark))
}

app.listen(process.env.PORT)
