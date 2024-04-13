import { renderToString } from '@dark-engine/platform-server'
import { ServerStyleSheet } from '@dark-engine/styled/server'
import { Translator } from '@wareme/translations'

import { getCurrentLanguage, matchBaseRoute } from '../../../src/routes'
import { getTitleFromPathname } from '../../../src/translations'
import { getMessagesSync } from './utils'
import App from '../../../src/components/App'
import Page from './Page'

export async function dark (elysiaContext) {
  const currentPath = elysiaContext.path
  const currentRoute = matchBaseRoute(currentPath)
  const currentLanguage = getCurrentLanguage(currentRoute, currentPath)
  const messages = getMessagesSync(currentLanguage)
  const translator = new Translator(currentLanguage, messages)
  const title = getTitleFromPathname(currentPath)
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

    elysiaContext.set.headers['Content-Type'] = 'text/html'
    return body
  } catch (err) {
    console.error(err)
  } finally {
    sheet.seal()
  }
}
