import { join } from 'bun:path'

// tryFiles returns a static file from the build directory, if found. otherwise it passes the request
// to the specified handler.
export function tryFiles (elysiaContext, publicDir, handler) {
  const absolutePath = join(process.cwd(), publicDir, elysiaContext.path)

  // prevent relative path abuse
  const allowedBasePath = join(process.cwd(), publicDir, '/')
  if (!absolutePath.startsWith(allowedBasePath)) {
    return elysiaContext.error(403) // 'Forbidden'
  }

  if (absolutePath === allowedBasePath) {
    return handler(elysiaContext)
  }

  const file = Bun.file(absolutePath)
  if (file.size === 0) {
    return handler(elysiaContext)
  }

  return file
}
