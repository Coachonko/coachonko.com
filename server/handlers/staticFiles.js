import { join } from 'node:path'

const doubleExtension = ['gz', 'map']

function mimeFromExtension (extension) {
  switch (extension) {
    case 'html':
      return 'text/html'
    case 'js':
      return 'application/javascript'
    case 'json':
      return 'application/json'
    case 'css':
      return 'text/css'
    case 'xml':
      return 'text/xml'
    case 'ico':
      return 'image/x-icon'
    default:
      return 'application/octet-stream'
  }
}

function getAppropriateContentType (filePath) {
  const splitFilePath = filePath.split('.')
  // no extension
  if (splitFilePath.length < 2) {
    return 'application/octet-stream'
  }

  const lastIndex = splitFilePath.length - 1
  if (doubleExtension.includes(splitFilePath[lastIndex])) {
    return getAppropriateContentType(splitFilePath.slice(0, lastIndex).join('.'))
  }
  return mimeFromExtension(splitFilePath[lastIndex])
}

function getAppropriateDirectory (prefixPath) {
  if (prefixPath === '/public') {
    return 'public'
  }
  if (prefixPath === '/assets') {
    return 'build'
  }
}

// TODO serve gzipped files if available, produce them with Bun.gzipSync() otherwise for the next request
export async function staticFile (elysiaContext, prefixPath) {
  const numberOfCharacters = `${prefixPath}`.length
  const filePath = elysiaContext.path.slice(numberOfCharacters)
  const directory = getAppropriateDirectory(prefixPath)

  const absolutePath = join(process.cwd(), directory, filePath)

  // prevent relative path abuse
  const allowedBasePath = join(process.cwd(), directory)
  if (!absolutePath.startsWith(allowedBasePath)) {
    // elysiaContext.set.status = 403
    // return 'Forbidden'
    return elysiaContext.error(403)
  }

  const file = Bun.file(absolutePath)

  if (file.size === 0) {
    // elysiaContext.set.status = 404
    // return 'Not found'
    return elysiaContext.error(404)
  }

  const fileStream = await file.stream()
  const contentType = getAppropriateContentType(filePath)
  return new Response(fileStream, {
    headers: { 'Content-Type': contentType }
  })
}
