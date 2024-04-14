import { join } from 'bun:path'

function getAppropriateDirectory (prefixPath) {
  if (prefixPath === '/public') {
    return 'public'
  }
  if (prefixPath === '/assets') {
    return 'build'
  }
}

export async function staticFile (elysiaContext, prefixPath) {
  const numberOfCharacters = `${prefixPath}`.length
  const filePath = elysiaContext.path.slice(numberOfCharacters)
  const directory = getAppropriateDirectory(prefixPath)

  const absolutePath = join(process.cwd(), directory, filePath)

  // prevent relative path abuse
  const allowedBasePath = join(process.cwd(), directory)
  if (!absolutePath.startsWith(allowedBasePath)) {
    return elysiaContext.error(403) // 'Forbidden'
  }

  const file = Bun.file(absolutePath)

  if (file.size === 0) {
    return elysiaContext.error(404) // 'Not found'
  }

  return file
}
