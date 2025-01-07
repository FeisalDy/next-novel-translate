'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGetBooks } from '@/hooks/books/useGetBooks'
import { useDeleteBookById } from '@/hooks/books/useDeleteBookById'
import BookDataTable from '@/app/dashboard/books/book-table'

export default function BookPage () {
  const { data, isPending } = useGetBooks()
  const { mutate: server_deleteProduct } = useDeleteBookById()

  return (
    <div className='p-4'>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/books/form?mode=create'>Create New Book</Link>
        </Button>
      </div>

      <BookDataTable
        data={data?.data ? data.data : []}
        isPending={isPending}
        server_deleteProduct={server_deleteProduct}
      />
    </div>
  )
}
