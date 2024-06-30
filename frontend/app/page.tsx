import React from 'react';
import Link from 'next/link';

import { api } from '@/api';
import { BookCard, PaginationButtons } from '@/components';
import { onePageLimitBooks as limit } from '@/constants';

interface Book {
  _id: string;
  title: string;
  description: string;
  cover_image: string;
}

async function fetchBooks(page: number): Promise<{ books: Book[] }> {
  const skip = (page - 1) * limit;  // Calculate skip value based on page number and limit
  try {
    const response = await api.get(`/books/?skip=${skip}&limit=${limit}`);
    return {
      books: response.data,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      books: [],
    };
  }
}

export default async function BooksPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;  // Parse page parameter from searchParams or default to page 1
  const { books } = await fetchBooks(page);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center gap-6 mb-4">
        <h1 className="text-2xl font-bold">Books</h1>
        <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href="/create-book">
          Create Book
        </Link>
      </div>
      {books.length === 0 ? (
        <div className="text-center text-gray-700">No books available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} id={book._id} title={book.title} description={book.description} coverImage={book.cover_image} />
          ))}
        </div>
      )}
      <PaginationButtons page={page} />
    </div>
  );
}
