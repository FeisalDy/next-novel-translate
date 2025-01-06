import { Button } from '@/components/ui/button'
import { getChapter } from '@/server/chapters'
import Link from 'next/link'

export default async function BookPage ({
  params
}: {
  params: Promise<{ chapterNumber: string; id: string }>
}) {
  const { chapterNumber, id } = await params
  const { data, message } = await getChapter(Number(id), Number(chapterNumber))
  //   console.log(data)

  return (
    <div className='prose-base p-[22px] md:prose-base'>
      <h1 className='capitalize'>{data?.chapterTitle}</h1>
      <div>
        {/* {data?.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))} */}
        {data?.content.split('\n').map((line, index) => {
          const isDialogue =
            line.trim().startsWith('"') && line.trim().endsWith('"')
          return (
            <p
              key={index}
              className={isDialogue ? 'font-bold' : ''} // Add a custom class for dialogues
            >
              {line}
            </p>
          )
        })}
      </div>

      <div className='flex justify-between mt-4'>
        {data?.id && data?.bookId ? (
          <>
            {data.chapterNumber > 1 && (
              <Link href={`/${data.bookId}/${data.chapterNumber - 1}`}>
                <Button asChild>
                  <span>Previous</span>
                </Button>
              </Link>
            )}
            <Link href={`/${data.bookId}/${data.chapterNumber + 1}`}>
              <Button asChild>
                <span>Next</span>
              </Button>
            </Link>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  )
}
