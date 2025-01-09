import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { isImageUrlValid } from '@/lib/isImageUrlValid'
import { capitalizeSentences } from '@/lib/capitalizeSentence'
import { BookT } from '@/types/books-type'

interface CreateChapterDialogProps {
  data: BookT | undefined
}

export default async function ContentCard ({ data }: CreateChapterDialogProps) {
  return (
    <>
      <Card className='prose-base'>
        <CardContent className='grid gap-y-6'>
          <div className='aspect-[3/4] relative sm:max-w-[300px] sm:max-h-[400px]'>
            <Image
              src={
                data?.cover && isImageUrlValid(data?.cover)
                  ? data?.cover
                  : '/3x4-placeholder.jpg'
              }
              fill
              alt={data?.title ?? 'Book cover'}
              objectFit='cover'
              className='rounded-sm'
            />
          </div>

          <div>
            {data?.title && <h3 className='capitalize'>Title: {data.title}</h3>}
            {data?.author && (
              <p className='text-gray-500'>Author: {data.author}</p>
            )}
            {data?.description && (
              <p className='text-justify'>
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

          <ul className='grid md:grid-cols-2 gap-2 p-0'>
            {data?.chapters &&
              data?.chapters
                .sort((a, b) => a.chapterNumber - b.chapterNumber)
                .map(chapter => (
                  <Link
                    key={chapter.id}
                    href={`/books/${data.id}/${chapter.chapterNumber}`}
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
