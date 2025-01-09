import BookShow from '@/components/book/book-show'
import { getBooks } from '@/server/books'
import PaginationComponent from '@/app/_components/Pagination'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: 'All Books',
    default: `All Books`
  }
}

export default async function BookHome ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const limit = ((await searchParams).limit as string) || '10'
  const page = ((await searchParams).page as string) || '1'

  const { data, pagination } = await getBooks({ limit, page })

  return (
    <div className='mx-auto py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data.map(book => (
          <BookShow key={book.id} data={book} className='border-none' />
        ))}
      </div>
      <PaginationComponent pagination={pagination} />
    </div>
  )
}
