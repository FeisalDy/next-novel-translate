export type BookSiteMapDataT = {
  id: number
  updateAt: string
}

export type GetBookSiteMapResponseT = {
  message: string
  data?: BookSiteMapDataT[]
}

export type ChapterSiteMapDataT = {
  bookId: number
  chapterNumber: string
}

export type GetChapterSiteMapResponseT = {
  message: string
  data?: ChapterSiteMapDataT[]
}
