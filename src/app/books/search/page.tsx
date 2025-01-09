import BookShow from '@/components/book/book-show'
import { getBooks } from '@/server/books'
import PaginationComponent from '@/app/_components/Pagination'
import SearchComponent from '@/components/navbar/search'
import { SearchByMenu } from '@/components/search/search-by-menu'

export default async function BookHome ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const {
    keyword,
    type = 'title',
    limit = '10',
    page = '1'
  } = await searchParams

  const { data, pagination } = await getBooks({ keyword, type, limit, page })

  return (
    <div className='mx-auto p-6 space-y-4'>
      <SearchComponent className='' />

      <SearchByMenu type={type} />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data.length === 0 ? (
          <p className='text-center col-span-full'>Not found</p>
        ) : (
          data.map(book => (
            <BookShow key={book.id} data={book} className='border-none' />
          ))
        )}
      </div>
      <PaginationComponent pagination={pagination} />
    </div>
  )
}
