import { getBookById } from '@/server/books'
import Link from 'next/link'

export default async function BookPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data, message } = await getBookById(id)
  //   console.log(data)

  return (
    <div className='prose-sm md:prose-base'>
      <header className='flex flex-col items-center'>
        <h4 className='capitalize'>{data?.title}</h4>
        <img
          src={data?.cover || '/vercel.svg'}
          alt={data?.title || 'Book cover'}
          width={200}
        />
      </header>
      <section className='capitalize'>
        <ul>
          <li>Title: {data?.title}</li>
          <li>Author: {data?.author}</li>
          <li>Word: {data?.wordCount}</li>
          <li>Tags: {data?.tags.join(', ')}</li>
        </ul>
      </section>
      <article className='text-wrap px-[22px]'>{data?.description}</article>
      <div className='capitalize'>
        <ul>
          {data?.chapters &&
            data?.chapters
              .sort((a, b) => a.chapterNumber - b.chapterNumber)
              .map(chapter => (
                <Link key={chapter.id} href={`/${id}/${chapter.chapterNumber}`}>
                  <li>
                    {chapter.chapterNumber} - {chapter.chapterTitle}
                  </li>
                </Link>
              ))}
        </ul>
      </div>
    </div>
  )
}
