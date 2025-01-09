import ContentCard from '@/components/book/book-content-card'
import MenuDialog from '@/components/(dashboard)/book/menu-dialog'
import { getBookById } from '@/server/books'

export default async function BookPage ({
  params
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params
  const { data } = await getBookById(bookId)

  return (
    <div className='p-4 relative'>
      <MenuDialog bookId={bookId} />
      <ContentCard data={data} />
    </div>
  )
}
