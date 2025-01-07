'use server'
import { revalidateTag } from 'next/cache'

const API_TRANSLATE_URL = 'http://127.0.0.1:5000/api/'

type translateBookChaptersResponseT = {
  data?: string
  status: string
  message?: string
}
export async function translateBookChaptersByBookId (
  bookId: number,
  source_lang?: string,
  target_lang?: string
): Promise<translateBookChaptersResponseT> {
  source_lang = source_lang || 'zh-CN'
  target_lang = target_lang || 'en'
  try {
    const res = await fetch(API_TRANSLATE_URL + 'translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bookId,
        source_lang,
        target_lang
      })
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return { status: 'error', message: 'Error translating book chapters' }
  } finally {
    revalidateTag(`books${bookId}`)
  }
}

type translateBookResponseT = {
  data?: string
  status: string
  message?: string
}
export async function translateBookById (
  id: number,
  source_lang?: string,
  target_lang?: string
): Promise<translateBookResponseT> {
  source_lang = source_lang || 'zh-CN'
  target_lang = target_lang || 'en'

  console.log('Translating book', id, 'from', source_lang, 'to', target_lang)

  try {
    const res = await fetch(API_TRANSLATE_URL + 'translate/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        source_lang,
        target_lang
      })
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return { status: 'error', message: 'Error translating book' }
  } finally {
    revalidateTag(`book${id}`)
  }
}
