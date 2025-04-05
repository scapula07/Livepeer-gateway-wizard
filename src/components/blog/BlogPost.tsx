import React from 'react'
import Image from 'next/image'

interface BlogPostProps {
  id: string
  title: string
  date: string
  author: string
  content: React.ReactNode
  image: string
}

export default function BlogPost({
  id,
  title,
  date,
  author,
  content,
  image
}: BlogPostProps) {
  return (
    <article id={id} className="flex flex-col space-y-6">
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <time className="text-gray-400">{date}</time>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <span className="text-gray-400">By {author}</span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          {content}
        </div>
      </div>
    </article>
  )
} 