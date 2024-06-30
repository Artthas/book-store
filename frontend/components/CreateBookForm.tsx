'use client';  // Enable client-side JavaScript

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { api } from '@/api';
import { onePageLimitBooks as limit } from '@/constants';

export default function CreateBookForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    setError(null);  // Clear any previous error message

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      await api.post('/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set headers for FormData
        },
      });

      const totalBooksResponse = await api.get('/books/total');  // Fetch total number of books from API
      const totalBooks = totalBooksResponse.data.total;  // Extract total number of books from response
      const lastPage = Math.ceil(totalBooks / limit);  // Calculate last page number based on total books and limit

      setTitle('');
      setDescription('');
      setCoverImage(null);

      router.push(`/?page=${lastPage}`);  // Navigate to last page after book creation
      router.refresh();  // Manually refresh the page to trigger a new request for books, ensuring the updated list with the newly created book is fetched from the server
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        setError(axiosError.response.data.detail);
      } else if (axiosError.request) {
        console.error('Request error:', axiosError.request);
        setError('Request error');
      } else {
        console.error('Error creating book:', error);
        setError('Failed to create book. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={18}
          disabled={isLoading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={72}
          disabled={isLoading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
          Cover Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="coverImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setCoverImage(e.target.files[0]);
            }
          }}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Book'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </form>
  );
}
