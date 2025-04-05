import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full min-h-screen bg-gray-50'>
        <div className='w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10'>
            {children}
        </div>
    </div>
  )
}