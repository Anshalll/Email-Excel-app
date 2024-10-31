import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex w-full items-center h-full shadow-lg justify-between px-[20px]'>
        <img src="https://images.tribuneindia.com/cms/gall_content/2019/4/2019_4$largeimg15_Monday_2019_083425749.jpg" alt="loading" className='w-[60px] h-[60px] object-cover object-center rounded-full' />


        <button className='bg-[crimson] text-white px-[30px] py-[10px] rounded-lg border-2 border-black'>Save</button>
    </nav>
  )
}
