import url from 'url'
import path from 'path'

function getCertainSizeSrcFromItunes (src: string, width = 10000, height = width) {
  let parsed = url.parse(src, false)
  let parsedPath = path.parse(parsed.pathname || '')
  parsedPath.name = parsedPath.name.replace(/\d+x\d+/, `${width}x${height}`)
  parsedPath.base = `${parsedPath.name}${parsedPath.ext}`
  parsed.pathname = path.format(parsedPath)
  return url.format(parsed)
}

function getCoverOriginSrcFrom163 (src: string) {
  let parsed = url.parse(src, false)
  delete parsed.search
  return url.format(parsed)
}

function getCoverOriginSrcFromVgm (src: string) {
  let parsed = url.parse(src, false)
  parsed.host = 'media.vgm.io'
  return url.format(parsed)
}

export function getCoverOriginSrc (src: string) {
  const coverHost = url.parse(src, true).hostname || ''

  if (coverHost.endsWith('.mzstatic.com')) {
    return getCertainSizeSrcFromItunes(src)
  }

  if (coverHost.endsWith('.music.126.net')) {
    return getCoverOriginSrcFrom163(src)
  }

  if (coverHost.endsWith('-media.vgm.io')) {
    return getCoverOriginSrcFromVgm(src)
  }

  return src
}

export function getCoverDownloadSrc (src: string, filename: string) {
  const originSrc = getCoverOriginSrc(src)
  return url.format({
    pathname: '/file',
    query: {
      url: originSrc,
      filename: `${filename}.jpg`
    }
  })
}

export function getJsdelivrCombinedLink (packages: {name?: string; version?: string; path?: string}[]) {
  let pathname = packages.map((p) => {
    let packagePath = url.resolve('npm/', `${p.name}@${p.version || 'latest'}`)
    if (p.path) {
      packagePath += '/'
      packagePath = url.resolve(packagePath, p.path)
    }
    return packagePath
  }).join()

  pathname = url.resolve('/combine/', pathname)

  let link = {
    protocol: 'https:',
    hostname: 'cdn.jsdelivr.net',
    pathname
  }
  return url.format(link)
}