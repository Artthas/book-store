import React from 'react';
import Link from 'next/link';

import { api } from '@/api';
import { onePageLimitBooks as limit } from '@/constants';

interface PaginationButtonsProps {
  page: number;
}

async function fetchBooksTotal(): Promise<{ totalBooks: number }> {
  try {
    const totalBooksResponse = await api.get('/books/total');
    return {
      totalBooks: totalBooksResponse.data.total
    };
  } catch (error) {
    console.error('Error fetching books total:', error);
    return {
      totalBooks: 0
    };
  }
}

export default async function PaginationButtons({ page }: PaginationButtonsProps) {
  const { totalBooks } = await fetchBooksTotal();

  const totalPages = Math.ceil(totalBooks / limit);

  if (totalPages <= 1) return null;

  const isPreviousDisabled = page === 1;
  const isNextDisabled = page >= totalPages;

  const pages = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
    pages.push(i);  // Create array of page numbers to display
  }

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {!isPreviousDisabled && (  // Render Previous button if it is not disabled
        <Link
          href={`/?page=${page - 1}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={`/?page=${p}`}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${p === page ? 'bg-blue-700' : ''}`}
        >
          {p}
        </Link>
      ))}
      {!isNextDisabled && (  // Render Next button if it is not disabled
        <Link
          href={`/?page=${page + 1}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
}