import React from 'react'
import Navbar from './components/Navbar'
import Sidebar1 from './components/Sidebar1'
import Sidebar2 from './components/Sidebar2'
export default function Layout({ children }) {
  return (
    <>

      <header className='h-[80px] w-full'>
        <Navbar />
      </header>

      <main className='h-[calc(100vh-80px)] w-full flex'>

        <Sidebar1 />
        {children}
        <Sidebar2 />
        
      </main>

    </>
  )
}
