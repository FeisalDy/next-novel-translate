'use client'
import { getBooks } from '@/server/books'
import { useQuery } from '@tanstack/react-query'
import { BookT } from '@/types/books-type'

export default function Home () {
  const { data, isPending } = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks({})
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data?.data.map((book: BookT) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  )
}
