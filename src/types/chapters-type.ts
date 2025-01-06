export type ChapterT = {
  id: number
  bookId: number
  chapterNumber: number
  chapterTitle: string
  content: string
  comments?: CommentT[]
}

export type CommentT = {
  id: number
  content: string
}

// Define the structure of the API response
export type GetChapterResponseT = {
  message: string
  data?: ChapterT
}

export type DeleteChapterByBookIdResponseT = {
  message: string
}
