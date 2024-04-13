import { renderToString } from '@dark-engine/platform-server'
import { ServerStyleSheet } from '@dark-engine/styled/server'
import { Translator } from '@wareme/translations'

import { getCurrentLanguage, matchRoute } from '../../../src/routes'
import { getRouteTitle } from '../../../src/translations'
import { getMessagesSync } from './utils'
import App from '../../../src/components/App'
import Page from './Page'

export async function dark (elysiaContext) {
  const currentPath = elysiaContext.path
  const currentRoute = matchRoute(currentPath)
  const currentLanguage = getCurrentLanguage(currentRoute, currentPath)
  const messages = getMessagesSync(currentLanguage)
  const translator = new Translator(currentLanguage, messages)
  const title = getRouteTitle(currentRoute)
  const sheet = new ServerStyleSheet()

  try {
    const app = await renderToString(sheet.collectStyles(
      <App
        currentPath={currentPath}
        translator={translator}
      />
    ))
    const styleTags = sheet.getStyleTags()

    const page = await renderToString(
      <Page
        currentRoute={currentRoute}
        currentLanguage={currentLanguage}
        title={title}
      />
    )

    const body = `<!DOCTYPE html>${page.replace('___app', app).replace('___styleTags', styleTags)}`

    // TODO see if Elysia has a method to return a response without utilizing Response constructor.
    return new Response(body, {
      headers: { 'content-type': 'text/html' }
    })
  } catch (err) {
    console.error(err)
  } finally {
    sheet.seal()
  }
}
