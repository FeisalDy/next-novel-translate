'use server'
import {
  GetBooksQueryT,
  GetBooksResponseT,
  GetBookResponseT,
  UpdateBookResponseT
} from '@/types/books-type'

export async function getBooks (
  query: GetBooksQueryT
): Promise<GetBooksResponseT> {
  const url = new URL(`${process.env.API_URL}/api/books`)

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })

  try {
    const res = await fetch(url.toString())

    if (!res.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return {
      message: 'Failed to fetch books',
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
      }
    }
  }
}

export async function getBookById (id: string): Promise<GetBookResponseT> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/books/${id}`, {
      next: { tags: [`books${id}`] }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch book')
    }

    const data = await res.json()
    return data
  } catch (error) {
    return {
      message: 'Failed to fetch book'
    }
  }
}

export async function createBook (data: FormData): Promise<any> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/books`, {
      method: 'POST',
      body: data
    })

    return res.json()
  } catch (error) {
    console.error('Error creating book:', error)
    return { message: 'Failed to create book' }
  }
}

export async function deleteBookById (id: number): Promise<any> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/books/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error('Failed to delete book')
    }

    return {
      message: 'Book deleted successfully'
    }
  } catch (error) {
    return {
      message: 'Failed to delete book'
    }
  }
}

export async function updateBookById (
  id: number,
  data: FormData
): Promise<UpdateBookResponseT> {
  console.log('data', data)
  try {
    const res = await fetch(`${process.env.API_URL}/api/books/${id}`, {
      method: 'PATCH',
      body: data
    })

    return res.json()
  } catch (error) {
    console.error('Error updating book:', error)
    return { message: 'Failed to update book' }
  }
}
