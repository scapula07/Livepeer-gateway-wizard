import React, { useRef } from 'react'
import BlogPreview from './BlogPreview'

interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  description: string
  image: string
}

const blogPosts = [
    {
      id: 'year-end-update-2024',
      title: '2024 Year-End Update: Real-time AI Launch',
      date: 'Dec 16, 2024',
      author: 'Livepeer Team',
      description: "As 2024 comes to a close, we're excited to share the latest updates...",
      image: '/images/year-end-2024.jpg',
      content: (
        <>
          <p>As 2024 comes to a close, we're excited to share the latest updates...</p>
          {/* Add more content */}
        </>
      )
    },
    {
      id: 'year-end-update-2024',
      title: '2024 Year-End Update: Real-time AI Launch',
      date: 'Dec 16, 2024',
      author: 'Livepeer Team',
      description: "As 2024 comes to a close, we're excited to share the latest updates...",
      image: '/images/year-end-2024.jpg',
      content: (
        <>
          <p>As 2024 comes to a close, we're excited to share the latest updates...</p>
          {/* Add more content */}
        </>
      )
    },
    {
      id: 'year-end-update-2024',
      title: '2024 Year-End Update: Real-time AI Launch',
      date: 'Dec 16, 2024',
      author: 'Livepeer Team',
      description: "As 2024 comes to a close, we're excited to share the latest updates...",
      image: '/images/year-end-2024.jpg',
      content: (
        <>
          <p>As 2024 comes to a close, we're excited to share the latest updates...</p>
          {/* Add more content */}
        </>
      )
    },
    // Add more blog posts
  ]

export default function BlogPreviewList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const scrollToArticle = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      
      {/* Scroll Controls */}
      <div className="hidden lg:flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10">
        <button 
          onClick={scrollLeft}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transform -translate-x-4"
        >
          ←
        </button>
        <button 
          onClick={scrollRight}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transform translate-x-4"
        >
          →
        </button>
      </div>

      {/* Preview List */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        {blogPosts.map((post) => (
          <BlogPreview
            key={post.id}
            {...post}
            onClick={() => scrollToArticle(post.id)}
          />
        ))}
      </div>
    </div>
  )
} 