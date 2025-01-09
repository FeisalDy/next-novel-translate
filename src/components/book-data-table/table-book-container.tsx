'use client'
import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useGetBooks } from '@/hooks/books/useGetBooks'
import { useGetQueryParams } from '@/hooks/useGetQueryParams'

export default function TableBookContainer () {
  const queryParams = useGetQueryParams()

  const limit = queryParams.limit
  const page = queryParams.page

  const { data, isPending, refetch } = useGetBooks({ limit, page })

  useEffect(() => {
    refetch()
  }, [limit, page])

  return (
    <div className='container mx-auto py-4'>
      <DataTable columns={columns} data={data?.data ? data.data : []} />
    </div>
  )
}
