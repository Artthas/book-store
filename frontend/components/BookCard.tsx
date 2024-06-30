import React from 'react';
import Image from 'next/image';

interface BookCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

export default function BookCard({ id, title, description, coverImage }: BookCardProps) {
  const coverImageUrl = coverImage ? `${process.env.NEXT_PUBLIC_API_URL}/books/${id}/cover_image` : '/default-cover.png';

  return (
    <div className="rounded overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative w-full h-64">
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base flex-1">{description}</p>
      </div>
    </div>
  );
};
