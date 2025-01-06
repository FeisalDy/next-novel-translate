import { CreateChapterDialog } from './create-chapter-dialog'
import TranslateButton from './translate-button'
import ContentCard from './content-card'
import DeleteButton from './delete-button'
export default async function BookPage ({
  params
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params

  return (
    <div className='p-4'>
      <div className='flex justify-end mb-4 gap-4'>
        <DeleteButton bookId={bookId} />
        <TranslateButton bookId={bookId} />
        <CreateChapterDialog bookId={bookId} />
      </div>

      <ContentCard bookId={bookId} />
    </div>
  )
}
