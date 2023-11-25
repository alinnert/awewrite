/**
 * @param {string | undefined} filename
 * @param {boolean} thumbnail
 * @return {string | null}
 */
export function getThemeImagePath(filename, thumbnail = false) {
  if (filename === undefined) {
    return null
  }

  return `url(themes/${thumbnail ? filename.replace(/\.jpg$/, '_thumb.jpg') : filename})`
}
