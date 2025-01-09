import ContentCard from '@/components/book/book-content-card'
import MenuDialog from '@/app/dashboard/books/[bookId]/menu-dialog'

export default async function BookPage ({
  params
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params

  return (
    <div className='p-4 relative'>
      <MenuDialog bookId={bookId} />
      <ContentCard bookId={bookId} />
    </div>
  )
}
