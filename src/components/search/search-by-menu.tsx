'use client'
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams'
import { cn } from '@/lib/utils'

type SearchByMenuPropsT = {
  className?: string
  type: string
}

const searchByMenuItems = [
  { label: 'Title', value: 'title' },
  { label: 'Author', value: 'author' },
  { label: 'Tags', value: 'tags' }
]

export function SearchByMenu ({ type, className }: SearchByMenuPropsT) {
  const { updateSearchParams } = useUpdateSearchParams()

  const handleSearch = (type: string) => {
    updateSearchParams({ type })
  }

  return (
    <div className={cn('flex', className)}>
      {searchByMenuItems.map(item => (
        <button
          key={item.value}
          onClick={() => handleSearch(item.value)}
          className={cn(
            'group first:ml-0 first:mr-6 last:mr-0 last:ml-6',
            type === item.value ? 'border-b-2 border-green-500' : ''
          )}
        >
          <p className='text-lg group relative w-max'>
            <span>{item.label}</span>
            <span
              className={cn(
                'absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-green-200',
                type !== item.value && 'group-hover:w-full'
              )}
            ></span>
          </p>
        </button>
      ))}
    </div>
  )
}
