// 'use client'
import React from 'react'
import BookForm, { BookFormValues } from '@/app/_components/BookForm'
import { getBookById } from '@/server/books'

export default async function ParentComponent ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const mode = ((await searchParams).mode as 'create' | 'edit') || 'create'

  const { data } = await getBookById('2')
  const mappedInitialData: Partial<BookFormValues> = {
    id: data?.id,
    title: data?.title,
    author: data?.author,
    description: data?.description,
    wordCount: data?.wordCount,
    //make tags array as stingw ith comma separated
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
