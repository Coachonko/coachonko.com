import { detectIsArray, detectIsString, detectIsUndefined } from '@dark-engine/core'

import { baseRoutes, getAlternatePaths } from '../src/routes'
import { config } from '../src/config'

export function generateSitemaps () {
  const paths = {
    index: '/build/sitemap-index.xml',
    static: '/build/sitemap-static.xml',
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

function mergeParentPath (parentPath, childPath) {
  if (parentPath === '/') {
    return childPath
  }
  return `${parentPath}${childPath}`
}

function writeRoutes (writer, routeArray, parentPath) {
  for (let i = 0, len = routeArray.length; i < len; i++) {
    const route = routeArray[i]
    // handle nested routes
    const children = route.children
    if (detectIsArray(children)) {
      const routePath = mergeParentPath(parentPath, route.path)
      writeRoutes(writer, children, routePath)
    }

    // Skip routes that aren't meant to be indexed
    if (detectIsUndefined(route.seo)) {
      continue
    }

    // Skip dynamic paths
    if (route.path.includes(':')) {
      continue
    }

    const routePath = mergeParentPath(parentPath, route.path)
    const alternatePaths = getAlternatePaths(routePath)
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
