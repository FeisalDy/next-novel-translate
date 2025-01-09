import { redirect } from 'next/navigation'
import { getBookSiteMap } from '@/server/sitemap'
export default async function Home () {
  redirect('/books')

  const dummy = await getBookSiteMap(1)

  console.log(dummy)

  return (
    <>
      {dummy.data?.map(dummy => (
        <div key={dummy.id}>
          <h1>{dummy.id}</h1>
          <p>{dummy.updateAt}</p>
        </div>
      ))}
    </>
  )
}
