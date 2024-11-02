import React from 'react'
import Layout from './Layout'
import { useActivmaildata } from './hooks/useActivmaildata'
import { useMaildata } from './hooks/useMaildata'
import Loading from './components/Loading'
export default function App() {

  const { activemail } = useActivmaildata()
  const { loading } = useMaildata()

  return (
    <Layout>
      {loading ? <div className='w-full h-full flex items-center justify-center'>

        <Loading width={30} height={30} />
      </div> : <div className='h-full bg-gray-300 w-[calc(100%-800px)] p-[20px]'>
        {activemail ? <div className='flex flex-col gap-[20px] p-[20px] rounded-lg bg-white'>
          <div className='w-full justify-between items-center flex'>

            <p className='flex items-center gap-[20px]'><span className='font-bold'>From</span>{activemail.value.From}</p>
            {activemail.type === "unsaved" ? <p className='bg-black py-[7px] rounded-lg text-red-400 px-[30px]'>Unsaved</p> : <p className='bg-black py-[7px] rounded-lg text-green-400 px-[30px]'>Saved</p>}


          </div>


          <p className='text-lg flex items-center gap-[20px]'><span className='font-bold'>Subject</span>{activemail.value.Subject}</p>
          <a href={activemail.value.Hyperlink} className='text-cyan-600  flex items-center gap-[20px]' target='_blank' rel="noreferrer"><span className='font-bold'>URL</span>{activemail.value.Hyperlink}</a>
          <p className='text-lg flex items-center gap-[20px]'><span className='font-bold'>Date & TIme</span>{activemail.value.Date}</p>

        </div> : <div className='w-full h-full flex items-center justify-center'>
          <h1 className='w-[50%] h-[50%] bg-white rounded-lg flex items-center justify-center text-lg font-bold'>No selected mail</h1>
        </div>}
      </div>}
    </Layout>
  )
}
