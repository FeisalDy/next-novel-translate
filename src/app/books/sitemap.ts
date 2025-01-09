import type { MetadataRoute } from 'next'
import { getBookSiteMap } from '@/server/sitemap'
import { BASE_URL } from '@/lib/constants'

export async function generateSitemaps () {
  //     const x = 101;
  // const y = 4;

  // const result = Math.floor(x / y) + (x % y);
  // console.log(result); // Output: 6

  return [{ id: 0 }, { id: 1 }]
}

export default async function sitemap ({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const books = await getBookSiteMap(id)

  const bookData = Array.isArray(books?.data) ? books.data : []

  if (bookData.length === 0) {
    return [
      {
        url: `${BASE_URL}/books/1`,
        lastModified: new Date().toISOString()
      }
    ]
  }

  return bookData.map(book => ({
    url: `${BASE_URL}/books/${book.id}`,
    lastModified: book.updateAt || new Date().toISOString()
  }))
}
