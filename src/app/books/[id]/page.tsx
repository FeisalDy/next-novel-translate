import ContentCard from '@/components/book/book-content-card'

export default async function BookPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <ContentCard bookId={id} />
    </>
  )
}
