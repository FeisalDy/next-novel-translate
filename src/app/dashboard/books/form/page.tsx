import React from 'react'
import BookForm, { BookFormValues } from '@/app/_components/BookForm'
import { getBookById } from '@/server/books'

export default async function ParentComponent ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const mode = ((await searchParams).mode as 'create' | 'edit') || 'create'
  const id = (await searchParams).id as string

  if (!id && mode === 'edit') {
    return <h1>Invalid ID</h1>
  }

  const { data } = await getBookById(id)
  const mappedInitialData: Partial<BookFormValues> = {
    id: data?.id,
    title: data?.title,
    author: data?.author,
    description: data?.description,
    wordCount: data?.wordCount,
    tags: data?.tags.join(', '),
    cover: data?.cover
  }

  return (
    <>
      <BookForm
        mode={mode}
        {...(mode === 'edit' && { initialValues: mappedInitialData })}
      />
    </>
  )
}
