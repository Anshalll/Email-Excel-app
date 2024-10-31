import React from 'react'
import { useEffect } from 'react'
import { Fetchmaildata } from '../redux/fetchmails/Asyncthunk'
import { useDispatch } from 'react-redux'
import { useMaildata } from '../hooks/useMaildata'
export default function Sidebar1() {

  const { data, loading, error } = useMaildata()
  const dispatch = useDispatch()

  useEffect(() => {

    if (loading) {

      dispatch(Fetchmaildata('/'))
    }
    else if (error) {
      console.error(error)
    }
    else {
      console.log(data)
    }

  }, [dispatch, loading, error, data])

  return (
    <div className='h-[100%] w-[400px] shadow-lg p-[20px]'>
      {loading ? "Loading" :


        
        <div className='scroller flex flex-col h-full overflow-y-auto gap-[20px]'>
          <p>Unsaved data</p>
          {data.data.map((value, index) => (
            <p id='unsaved' className='flex w-full bg-yellow-500 p-[7px] items-center rounded-lg text-black shadow-lg gap-[20px]' key={index}> <input className='rounded-lg bg-gray-900 w-[15px] h-[15px]' type="checkbox" name="selected-message" id={value.messageid} /> {value.From.slice(0, 20)}...</p>
          ))}

        </div>
      }
    </div>
  )
}
