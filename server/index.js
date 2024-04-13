import Elysia from 'elysia'

import { dark } from './handlers/dark'
import { staticFile } from './handlers/staticFiles'
import { generateSitemaps } from './sitemaps'

await generateSitemaps()

new Elysia()
  .get('/assets/*', async (elysiaContext) => staticFile(elysiaContext, '/assets'))
  .get('/public/*', async (elysiaContext) => staticFile(elysiaContext, '/public'))
  .get('*', async (elysiaContext) => dark(elysiaContext))
  .listen(process.env.PORT)
