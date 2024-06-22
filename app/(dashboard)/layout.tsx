import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full bg-primary/5 '>
      {/* Navbar */}
      <div className='h-[80px] fixed inset-y-0 w-full z-50'>
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className='hidden mt-20  lg:flex h-full w-72  flex-col  fixed inset-y-0 z-50 '>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className='lg:pl-72 bg-gray-200 overflow-y-auto h-full pt-[80px] '>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
