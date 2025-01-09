import { useQuery } from '@tanstack/react-query'
import { getBooks } from '@/server/books'

type GetBooksQueryT = {
  page?: string | null
  limit?: string | null
}

export function useGetBooks ({ limit, page }: GetBooksQueryT) {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks({ limit, page })
  })
}
