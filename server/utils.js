export async function gzipFile (filePath) {
  if (!filePath.startsWith(process.cwd())) {
    const newPath = `${process.cwd()}${filePath}`
    return gzipFile(newPath)
  }

  // only allow compressing files in public and build directories
  const buildPath = `${process.cwd()}/build`
  const publicPath = `${process.cwd()}/public`
  if (!filePath.startsWith(buildPath) && !filePath.startsWith(publicPath)) {
    return console.error(`forbidden access to ${filePath}`)
  }

  const originalFile = Bun.file(filePath)
  if (originalFile.size === 0) {
    return console.error(`file does not exist at location ${filePath}`)
  }

  try {
    const originalFileContent = await originalFile.text()
    const compressedPath = `${filePath}.gz`
    const compressedFile = Bun.file(compressedPath)
    const compressedWriter = compressedFile.writer()
    const compressed = Bun.gzipSync(originalFileContent)
    compressedWriter.write(compressed)
    compressedWriter.end()
  } catch (error) {
    console.error(`Error compressing file ${filePath}: ${error}`)
  }
}
