import type { MetadataRoute } from 'next'
import { getChapterSiteMap } from '@/server/sitemap'
import { BASE_URL } from '@/lib/constants'

export async function generateSitemaps () {
  return [{ id: 0 }, { id: 1 }]
}

export default async function sitemap ({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const chapters = await getChapterSiteMap(id)

  const chapterData = Array.isArray(chapters?.data) ? chapters.data : []

  return chapterData.map(chapter => ({
    url: `${BASE_URL}/books/${chapter.bookId}/${chapter.chapterNumber}`
  }))
}
