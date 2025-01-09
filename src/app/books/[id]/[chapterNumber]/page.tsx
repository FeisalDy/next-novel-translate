import { Button } from '@/components/ui/button'
import { getChapter } from '@/server/chapters'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

export default async function BookPage ({
  params
}: {
  params: Promise<{ chapterNumber: string; id: string }>
}) {
  const { chapterNumber, id } = await params
  const { data, message } = await getChapter(Number(id), Number(chapterNumber))

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
