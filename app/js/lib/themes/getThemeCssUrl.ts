import { getThumbnailFilename } from './getThumbnailFilename'

export function getThemeCssUrl(filename: string | undefined, thumbnail = false): string {
  if (filename === undefined) {
    return 'none'
  }

  return `url(themes/${thumbnail ? getThumbnailFilename(filename) : filename})`
}
