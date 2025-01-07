export function isImageUrlValid (cover: string | undefined): boolean {
  // Check if cover is defined and a valid URL or starts with a leading slash (relative path).
  return (
    typeof cover === 'string' &&
    (cover.startsWith('http://') ||
      cover.startsWith('https://') ||
      cover.startsWith('/'))
  )
}
