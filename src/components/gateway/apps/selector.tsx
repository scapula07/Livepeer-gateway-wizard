import React from 'react'
import { Tab } from '@headlessui/react'

interface AppCategory {
    name: string;
    id: string;
}

interface App {
    id: string;
    name: string;
    description: string;
    icon: string;
}

const categories: AppCategory[] = [
    { name: 'All', id: 'all' },
    // { name: 'Infra', id: 'databases' },
    // { name: 'Web Apps', id: 'web-apps' },
    // { name: 'Development', id: 'development' },
    // { name: 'AI/ML', id: 'ai-ml' },
]

export default function AppSelector() {
    const [searchQuery, setSearchQuery] = React.useState('')
    
    return (
        <div className='w-full flex flex-col space-y-6'>
            {/* Header Section */}
            <div className='flex flex-col space-y-2'>
                <h1 className='text-2xl md:text-3xl font-semibold'>Sideload an Application</h1>
                <p className='text-gray-600'>Select an application to sideload with your Gateway</p>
            </div>
            
            {/* Search Bar */}
            <div className='w-full'>
                <input 
                    type='text'
                    placeholder='Search applications...'
                    className='w-full md:w-96 px-4 py-2 border rounded-md outline-none  opacity-40'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <Tab.Group>
                <Tab.List className='flex space-x-2 border-b'>
                    {categories.map((category) => (
                        <Tab
                            key={category.id}
                            className={({ selected }) =>
                                `px-4 py-2 text-sm font-medium focus:outline-none
                                ${selected 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`
                            }
                        >
                            {category.name}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className='mt-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <AppCard />
                    </div>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

function AppCard() {
    return (
        <div className='flex flex-col p-4 border rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer'>
            <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center'>
                     <img src={"/owncast.svg"} />
                </div>
                <div className='flex-1'>
                    <h3 className='font-medium'>Owncast</h3>
                    <p className='text-xs text-gray-600 mt-1'>Owncast is an open source, self-hosted, decentralized, single user live video streaming and chat server for running your own live streams similar in style to the large mainstream options. It offers complete ownership over your content, interface, moderation and audience.</p>
                </div>
            </div>
            <div className='mt-4 flex justify-end space-x-3'>
                {/* <button className='px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50'>
                    Details
                </button> */}
                <button className='px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-green-700'>
                    Select
                </button>
            </div>
        </div>
    )
}