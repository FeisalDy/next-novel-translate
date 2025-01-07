import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { BookT } from '@/types/books-type'

type BookDataTablePropsT = {
  data: BookT[]
  isPending: boolean
  server_deleteProduct: any
}
import { isImageUrlValid } from '@/lib/isImageUrlValid'
export default function BookDataTable ({
  data,
  isPending,
  server_deleteProduct
}: BookDataTablePropsT) {
  return (
    <Table>
      <TableHeader className=''>
        <TableRow>
          <TableHead className='w-[200px]'>Image</TableHead>
          <TableHead className=''>Title</TableHead>
          <TableHead className='w-[50px]'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=''>
        {isPending && (
          <TableRow>
            <TableCell>Loading...</TableCell>
          </TableRow>
        )}
        {data.map(book => (
          <TableRow key={book.id}>
            <TableCell>
              <Link href={`/dashboard/books/${book.id}`}>
                <Image
                  src={
                    isImageUrlValid(book.cover)
                      ? book.cover
                      : '/3x4-placeholder.jpg'
                  }
                  alt={book.title}
                  width={150}
                  height={200}
                />
              </Link>
            </TableCell>
            <TableCell className='align-text-top text-2xl capitalize'>
              <Link href={`/dashboard/books/${book.id}`}>
                <div className='w-full h-full'>{book.title}</div>
              </Link>
            </TableCell>

            <TableCell className=''>
              <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent className=''>
                  <Link href={`/dashboard/books/form?mode=edit&id=${book.id}`}>
                    <DropdownMenuItem className='hover:cursor-pointer'>
                      Update
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className='text-red-500 hover:cursor-pointer'
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
  )
}
