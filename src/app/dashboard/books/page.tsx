import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TableBookContainer from '@/components/book-data-table/table-book-container'

export default function BookPage () {
  return (
    <div className='p-4'>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/books/form?mode=create'>Create New Book</Link>
        </Button>
      </div>

      <TableBookContainer />
    </div>
  )
}
