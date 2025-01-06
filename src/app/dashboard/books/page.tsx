'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getBooks } from '@/server/books'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteBookById } from '@/server/books'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

export default function Page () {
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks({})
  })

  const { mutate: server_deleteProduct } = useMutation({
    mutationFn: (id: number) => deleteBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
    onError: error => {
      console.error('Error deleting product:', error)
    }
  })

  return (
    <div className='p-4'>
      <div className='flex justify-end mb-4'>
        <Button asChild>
          <Link href='/dashboard/books/form?mode=create'>Create New Book</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Image</TableHead>
            <TableHead className=''>Title</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {isPending && (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
          {data?.data &&
            data?.data?.map(book => (
              <TableRow key={book.id}>
                <TableCell>
                  <Link href={`/dashboard/books/${book.id}`}>
                    <Image
                      src={book.cover || '/3x4-placeholder.jpg'}
                      alt={book.title}
                      width={150}
                      height={200}
                    />
                  </Link>
                </TableCell>
                <TableCell className='align-text-top text-2xl capitalize'>
                  {book.title}
                </TableCell>
                <TableCell className=''>
                  <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/dashboard/books/form?mode=edit`} passHref>
                        <DropdownMenuItem className=''>Update</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className='text-red-500'
                        onClick={() => server_deleteProduct(book.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
