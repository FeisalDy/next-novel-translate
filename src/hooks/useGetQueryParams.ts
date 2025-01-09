'use client'

import { useSearchParams } from 'next/navigation'

interface QueryParams {
  [key: string]: string | null
}

export const useGetQueryParams = (): QueryParams => {
  const searchParams = useSearchParams()

  const params: QueryParams = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}
