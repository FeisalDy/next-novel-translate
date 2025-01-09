/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hVl5q7YIHfe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams'
import { useRef } from 'react'
import { redirect } from 'next/navigation'
import { useGetQueryParams } from '@/hooks/useGetQueryParams'
type SearchComponentPropsT = {
  className?: string
}

export default function SearchComponent ({ className }: SearchComponentPropsT) {
  const { updateSearchParams } = useUpdateSearchParams()
  const queryParams = useGetQueryParams()
  const keywordsInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const keyword = keywordsInputRef.current?.value
    if (keyword) {
      //   updateSearchParams({ title })
      redirect(`/books/search?keyword=${keyword}`)
    }

    redirect('/books/search')
  }

  return (
    <div
      className={cn(
        'flex items-center space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2',
        className
      )}
    >
      <SearchIcon className='h-4 w-4' />
      <Input
        type='title'
        placeholder='Search book'
        className='w-full h-8 font-semibold focus-visible:ring-0'
        ref={keywordsInputRef}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
    </div>
  )
}

function SearchIcon (props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  )
}
