export type GetBooksQueryT = {
  page?: string | null
  limit?: string | null // Number of items per page, default is 10
  wordCount?: string // Word count filter
  keyword?: string // Keywords filter
  type?: string // Search type: title, author, tags
}

export type PaginationT = {
  currentPage: number
  totalPages: number
  totalItems: number
}

export type BookT = {
  id: number
  title: string
  cn_title: string
  author: string
  cn_atuhor: string
  description: string
  wordCount: number
  isCompleted: boolean
  updatedAt: string
  tags: string[]
  cover: string
  chapters?: ChapterT[]
}

// Define the structure of the API response
export type GetBooksResponseT = {
  message: string
  data: BookT[]
  pagination: PaginationT
}

export type ChapterT = {
  id: number
  chapterNumber: number
  chapterTitle: string
}

export type GetBookResponseT = {
  message: string
  data?: BookT
}

export type CreateBookResponseT = {}

export type UpdateBookResponseT = {
  message: string
  data?: BookT
}
