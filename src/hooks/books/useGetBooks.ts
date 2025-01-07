import { useQuery } from '@tanstack/react-query'
import { getBooks } from '@/server/books'

export function useGetBooks () {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks({ limit: '10' })
  })
}
