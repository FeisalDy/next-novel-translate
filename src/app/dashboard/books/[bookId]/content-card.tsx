'use client'
import Image from 'next/image'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { getBookById } from '@/server/books'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface CreateChapterDialogProps {
  bookId: string
}
export default function ContentCard ({ bookId }: CreateChapterDialogProps) {
  const queryClient = useQueryClient()

  const { data: raw_data, isPending } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId)
  })

  const data = raw_data?.data

  function capitalizeSentences (text: string): string {
    return text
      .replace(/\r\n/g, '<br />') // Replace line breaks
      .replace(/(^|\.|\?|\!)\s*(<br \/>)?\s*([a-z])/g, (_, p1, p2, p3) => {
        return `${p1}${p2 || ''} ${p3.toUpperCase()}`
      })
      .trim()
  }

  return (
    <>
      <Card className='prose-base'>
        <CardContent className=''>
          <div>
            <Image
              src={data?.cover ?? '/3x4-placeholder.jpg'}
              height={200}
              width={150}
              alt={data?.title ?? 'Book cover'}
            />
          </div>
          <div>
            {data?.title && <h3 className='capitalize'>Title: {data.title}</h3>}
            {data?.author && <p>Author: {data.author}</p>}
            {data?.description && (
              <p>
                Description:
                <br />
                <span
                  dangerouslySetInnerHTML={{
                    __html: capitalizeSentences(data.description)
                  }}
                />
              </p>
            )}
          </div>
          <Separator />
          <ul className='grid md:grid-cols-2 gap-2'>
            {data?.chapters &&
              data?.chapters
                .sort((a, b) => a.chapterNumber - b.chapterNumber)
                .map(chapter => (
                  <Link
                    key={chapter.id}
                    href={`/${data.id}/${chapter.chapterNumber}`}
                    passHref
                  >
                    <li className='capitalize cursor-pointer hover:underline'>
                      {chapter.chapterNumber} - {chapter.chapterTitle}
                    </li>
                  </Link>
                ))}
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
