import React from 'react'
import BlogPreviewList from './BlogPreviewList'
import Header from '../landingpage/header'
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full '>
          <Header />
          <div className="flex flex-col lg:flex-row min-h-screen bg-[#A3B18A] text-white py-4">
          <aside className="lg:w-1/4 lg:h-screen lg:sticky lg:top-0 overflow-y-auto p-4 border-r border-gray-800">
            <BlogPreviewList />
          </aside>
          <main className="flex-1 max-w-4xl mx-auto px-4 py-8 lg:px-8">
            {children}
          </main>
          </div>
    </div>

 
  )
} 