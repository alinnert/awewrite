export function getThumbnailFilename(filename: string): string {
  return filename.replace(/\.jpg$/, '_thumb.jpg')
}
