'use server'
import {
  GetChapterResponseT,
  DeleteChapterByBookIdResponseT
} from '@/types/chapters-type'
import { revalidateTag } from 'next/cache'

export async function getChapter (
  //   id?: string,
  bookId?: number,
  chapterNumber?: number
): Promise<GetChapterResponseT> {
  try {
    let url = `${process.env.API_URL}/api/chapters/1`

    // Add query parameters if `bookId` and `chapterNumber` are provided
    if (bookId && chapterNumber) {
      url += `?bookId=${bookId}&chapterNumber=${chapterNumber}`
    }

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Failed to fetch chapters')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return {
      message: 'Failed to fetch chapters'
    }
  }
}

export async function createChapter (data: any): Promise<any> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/chapters`, {
      method: 'POST',
      body: data
    })

    const result = await res.json()

    revalidateTag(`books${data.get('bookId')}`)
    return result
  } catch (error) {
    return {
      message: 'Failed to create chapters'
    }
  }
}

export async function deleteChaptersByBookId (
  bookId: string
): Promise<DeleteChapterByBookIdResponseT> {
  try {
    const res = await fetch(
      `${process.env.API_URL}` + `/api/chapters/book/${bookId}`,
      {
        method: 'DELETE'
      }
    )

    const result = await res.json()
    revalidateTag(`books${bookId}`)

    return result
  } catch (error) {
    return {
      message: 'Failed to delete chapters'
    }
  }
}
