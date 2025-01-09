'use client'

import { ColumnDef } from '@tanstack/react-table'
import { BookT } from '@/types/books-type'
import Image from 'next/image'
import { isImageUrlValid } from '@/lib/isImageUrlValid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useDeleteBookById } from '@/hooks/books/useDeleteBookById'
import Link from 'next/link'

export const columns: ColumnDef<BookT>[] = [
  {
    accessorKey: 'cover',
    header: 'Image',
    maxSize: 200,
    cell: ({ row }) => (
      <Link href={`/dashboard/books/${row.original.id}`}>
        <div className='w-[200px]'>
          <Image
            src={
              isImageUrlValid(row.getValue('cover'))
                ? row.getValue('cover')
                : '/3x4-placeholder.jpg'
            }
            alt={row.getValue('title')}
            width={150}
            height={200}
          />
        </div>
      </Link>
    )
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='prose-base'>
        <p className='capitalize text-2xl'>{row.getValue('title')}</p>
      </div>
    )
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const { mutate: server_deleteProduct } = useDeleteBookById()

      const book = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
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
      )
    }
  }
]
