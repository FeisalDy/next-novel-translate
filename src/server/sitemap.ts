'use server'
import {
  GetBookSiteMapResponseT,
  GetChapterSiteMapResponseT
} from '@/types/sitemap-type'

export async function getBookSiteMap (
  id: number
): Promise<GetBookSiteMapResponseT> {
  const url = new URL(`${process.env.API_URL}/api/sitemap/book/${id}`)

  try {
    const res = await fetch(url.toString())

    if (!res.ok) {
      throw new Error('Failed to fetch sitemap books ')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return {
      message: 'Failed to fetch sitemap books'
    }
  }
}

export async function getChapterSiteMap (
  id: number
): Promise<GetChapterSiteMapResponseT> {
  const url = new URL(`${process.env.API_URL}/api/sitemap/chapter/${id}`)

  try {
    const res = await fetch(url.toString())

    if (!res.ok) {
      throw new Error('Failed to fetch sitemap chapters')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return {
      message: 'Failed to fetch sitemap chapters'
    }
  }
}
