import Image from 'next/image'
import { cn } from '@/lib/utils'
import { BookT } from '@/types/books-type'
import { isImageUrlValid } from '@/lib/isImageUrlValid'
import { capitalizeSentences } from '@/lib/capitalizeSentence'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'

type BookShowPropsT = {
  data: BookT
  className?: string
}

export default async function BookShow ({ data, className }: BookShowPropsT) {
  return (
    <Link href={`/books/${data.id}`} passHref>
      <Card className={cn('', className)}>
        <CardContent className='hover:text-green-500 flex space-x-4 p-0'>
          <div className='relative aspect-[3/4] w-[150px] h-[200px]'>
            <Image
              src={
                data?.cover && isImageUrlValid(data?.cover)
                  ? data?.cover
                  : '/3x4-placeholder.jpg'
              }
              alt={data.title}
              fill
              className='object-cover'
            />
          </div>

          <div>
            <div className=''>
              <h3 className='text-lg font-semibold capitalize'>{data.title}</h3>
              <p className='text-sm text-gray-500'>{data.author}</p>
            </div>

            <div className=''>
              <p className='text-justify line-clamp-6'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: capitalizeSentences(data.description)
                  }}
                />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
