import Elysia from 'elysia'

import { dark } from './handlers/dark'

new Elysia()
  .get('*', ctx => dark(ctx))
  .on('start', () => console.log(`Running on port ${process.env.PORT}`))
  .listen(process.env.PORT)
