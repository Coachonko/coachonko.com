import { detectIsArray, detectIsString } from '@dark-engine/core'

import { baseRoutes, getAlternatePaths } from '../src/shared/routes'
import { config } from '../src/shared/config'
import { routeHasMeta } from '../src/server/utils'

export function generateSitemaps () {
  const paths = {
    index: '/build/browser/sitemap-index.xml',
    static: '/build/browser/sitemap-static.xml',
    dynamic: null // path of the route that will serve dynamic pages sitemap
  }
  try {
    generateSitemapIndex(paths)
    generateStaticPagesSitemap(paths)
  } catch (err) {
    console.error(err)
  }
}

function generateSitemapIndex (paths) {
  const indexPath = `${process.cwd()}${paths.index}`
  const file = Bun.file(indexPath)
  const writer = file.writer()
  writer.write(`<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <sitemap>
        <loc>${config.BASE_URL}${paths.static}</loc>
      </sitemap>`)
  if (detectIsString(paths.dynamic)) {
    writer.write(`<sitemap>
      <loc>${config.BASE_URL}${paths.dynamic}</loc>
      </sitemap>`)
  }
  writer.write('</sitemapindex>')
  writer.end()
}

function mergePaths (parentPath, routePath) {
  // homepages
  if (parentPath === '/') {
    return `${parentPath}${routePath}`
  }

  // root of nested in Fragment
  if (routePath === '') {
    return parentPath
  }

  return `${parentPath}/${routePath}`
}

function writeRoutes (writer, routeArray, parentPath) {
  for (let i = 0, len = routeArray.length; i < len; i++) {
    const route = routeArray[i]
    // handle nested routes
    const children = route.children
    const mergedRoutePath = mergePaths(parentPath, route.path)
    if (detectIsArray(children)) {
      writeRoutes(writer, children, mergedRoutePath)
      continue
    }

    // Skip routes that aren't meant to be indexed
    const metaKey = routeHasMeta(route.path, mergedRoutePath)
    if (metaKey === null) {
      continue
    }

    // Skip dynamic paths
    if (route.path.includes(':')) {
      continue
    }

    const alternatePaths = getAlternatePaths(mergedRoutePath)
    for (const language in alternatePaths) {
      writer.write(`<url>
              <loc>${config.BASE_URL}${alternatePaths[language]}</loc>`)
      let alternates = ''
      for (const alternateLanguage in alternatePaths) {
        alternates += `<xhtml:link
                rel="alternate"
                hreflang="${alternateLanguage}"
                href="${config.BASE_URL}${alternatePaths[alternateLanguage]}"/>`
      }
      writer.write(alternates)
      writer.write('</url>')
    }
  }
}

function generateStaticPagesSitemap (paths) {
  const staticPath = `${process.cwd()}${paths.static}`
  const file = Bun.file(staticPath)
  const writer = file.writer()
  writer.write(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">`)

  const parentPath = '/'
  writeRoutes(writer, baseRoutes, parentPath)

  writer.write('</urlset>')
  writer.end()
}

generateSitemaps()
