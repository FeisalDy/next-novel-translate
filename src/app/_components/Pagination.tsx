'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { PaginationT } from '@/types/books-type'
type PaginationComponentPropsT = {
  pagination: PaginationT
}

export default function PaginationComponent ({
  pagination
}: PaginationComponentPropsT) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { currentPage, totalPages } = pagination

  const updatePageInURL = (newPage: number) => {
    console.log('newPage', newPage)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(pathname + '?' + params.toString())
  }

  const generateHref = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  const generatePaginationButtons = () => {
    const buttons = []
    const maxButtons = 2
    const halfMaxButtons = Math.floor(maxButtons / 2)

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              isActive={i === currentPage}
              onClick={() => updatePageInURL(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      let startPage = Math.max(1, currentPage - halfMaxButtons)
      let endPage = Math.min(totalPages, currentPage + halfMaxButtons)

      if (currentPage <= halfMaxButtons) {
        endPage = maxButtons
      } else if (currentPage + halfMaxButtons >= totalPages) {
        startPage = totalPages - maxButtons + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={generateHref(i)}
              //   href='#'
              isActive={i === currentPage}
              onClick={() => updatePageInURL(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (startPage > 1) {
        buttons.unshift(
          <PaginationItem key='start-ellipsis'>
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.unshift(
          <PaginationItem key={1}>
            <PaginationLink href='#' onClick={() => updatePageInURL(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (endPage < totalPages) {
        buttons.push(
          <PaginationItem key='end-ellipsis'>
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={generateHref(totalPages)}
              //   href='#'
              onClick={() => updatePageInURL(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    return buttons
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // href='#'
            href={generateHref(Math.max(1, currentPage - 1))}
            onClick={() => updatePageInURL(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {generatePaginationButtons()}
        <PaginationItem>
          <PaginationNext
            href={generateHref(Math.max(1, currentPage + 1))}
            // href='#'
            onClick={() =>
              updatePageInURL(Math.min(totalPages, currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
