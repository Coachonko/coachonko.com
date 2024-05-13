import { component } from '@dark-engine/core'

import LinkedData from './LinkedData'
import Canonical from './Canonical'
import Meta from './Meta'
import { getBasePathname } from '../../shared/routes/utils'
import { getMeta, pathnameHasMeta } from '../utils'

const Page = component(({ currentPath, currentLanguage, title }) => {
  const basePathname = getBasePathname(currentPath)
  const metaKey = pathnameHasMeta(basePathname)
  const description = getMeta(metaKey, currentLanguage, 'description')
  return (
    <html lang={currentLanguage}>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <base href='/' />
        <title>{title}</title>

        <Meta
          currentPath={currentPath}
          metaKey={metaKey}
          currentLanguage={currentLanguage}
          title={title}
          description={description}
        />
        <Canonical
          currentPath={currentPath}
          metaKey={metaKey}
          currentLanguage={currentLanguage}
        />
        <LinkedData
          metaKey={metaKey}
          currentPath={currentPath}
          currentLanguage={currentLanguage}
          description={description}
        />

        <link rel='shortcut icon' href='/favicon.ico' />
        <script type='module' src='/_dark/index.js' defer />
        ___styleTags
      </head>
      <body>
        <div id='dark-root'>___app</div>
      </body>
    </html>
  )
})

export default Page
