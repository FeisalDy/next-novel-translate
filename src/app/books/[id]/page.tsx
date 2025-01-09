import ContentCard from '@/components/book/book-content-card'
import { getBookById } from '@/server/books'

import { cache } from 'react'

export async function getBookWithCache ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return cache(async () => {
    const { data } = await getBookById(id)
    return data
  })()
}

export async function generateMetadata ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const data = await getBookWithCache({ params })

  return {
    title: data?.title,
    description: data?.description
  }
}

export default async function BookPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const data = await getBookWithCache({ params })

  return (
    <>
      <ContentCard data={data} />
    </>
  )
}
