import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type SearchParamsT = {
  [key: string]: string | undefined
}

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateSearchParams = (newParams: SearchParamsT) => {
    const currentParams = new URLSearchParams(searchParams.toString())

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value)
      } else {
        currentParams.delete(key)
      }
    })

    router.push(`${pathname}?${currentParams.toString()}`)
  }

  return { updateSearchParams }
}
