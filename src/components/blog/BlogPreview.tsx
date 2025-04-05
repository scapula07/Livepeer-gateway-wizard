import React from 'react'
import Image from 'next/image'

interface BlogPreviewProps {
  id: string
  title: string
  date: string
  author: string
  description: string
  image: string
  onClick: () => void
}

export default function BlogPreview({
  id,
  title,
  date,
  author,
  description,
  image,
  onClick
}: BlogPreviewProps) {
  return (
    <div 
      className="flex flex-col bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 
                 transition-colors cursor-pointer min-w-[300px] mr-4"
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col space-y-2">
        <span className="text-sm text-gray-400">{date}</span>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <span className="text-sm text-gray-400">By {author}</span>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  )
} 