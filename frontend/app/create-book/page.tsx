import React from 'react';
import Link from 'next/link';

import { CreateBookForm } from '@/components';

export default function CreateBookPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center gap-6 mb-4">
        <h1 className="text-2xl font-bold">Create a New Book</h1>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/">
          Go to Home
        </Link>
      </div>
      <CreateBookForm />
    </div>
  );
}
