import { getChapter } from '@/server/chapters'
import { redirect } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cache } from 'react'

export async function getChapterWithCache ({
  params
}: {
  params: Promise<{ chapterNumber: string; id: string }>
}) {
  const { chapterNumber, id } = await params
  return cache(async () => {
    const { data, message } = await getChapter(
      Number(id),
      Number(chapterNumber)
    )
    return { data, message }
  })()
}

export async function generateMetadata ({
  params
}: {
  params: Promise<{ chapterNumber: string; id: string }>
}) {
  const { data } = await getChapterWithCache({ params })

  return {
    title: data?.chapterTitle,
    description: data?.content
  }
}

export default async function ChapterPage ({
  params
}: {
  params: Promise<{ chapterNumber: string; id: string }>
}) {
  const { data } = await getChapterWithCache({ params })

  if (!data) {
    redirect('/not-found')
  }

  return (
    <div className='prose-base p-[22px] md:prose-base'>
      <h1 className='capitalize'>{data?.chapterTitle}</h1>
      <div>
        {data?.content.split('\n').map((line, index) => {
          const isDialogue =
            line.trim().startsWith('"') && line.trim().endsWith('"')
          return (
            <p
              key={index}
              className={isDialogue ? 'font-bold text-justify' : 'text-justify'}
            >
              {line}
            </p>
          )
        })}
      </div>

      {data?.id && data?.bookId && (
        <Pagination className=''>
          <PaginationContent className=''>
            <PaginationItem>
              <PaginationPrevious
                href={`/books/${data.bookId}/${data.chapterNumber - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`/books/${data.bookId}`}
                size='default'
                className='gap-1 pr-2.5'
              >
                <span>Table of Content</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`/books/${data.bookId}/${data.chapterNumber + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
