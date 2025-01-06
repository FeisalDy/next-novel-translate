'use server'

type translateBookChaptersResponseT = {
  data?: string
  status: string
  message?: string
}
export async function translateBookChapters (
  bookId: number,
  source_lang?: string,
  target_lang?: string
): Promise<translateBookChaptersResponseT> {
  const API_TRANSLATE_URL = 'http://127.0.0.1:5000/api/translate'
  source_lang = source_lang || 'zh-CN'
  target_lang = target_lang || 'en'
  try {
    const res = await fetch(API_TRANSLATE_URL, {
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
  }
}
