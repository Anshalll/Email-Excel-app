import React, { useEffect, useState } from 'react'
import { useMaildata } from '../hooks/useMaildata'
export default function Sidebar2() {

  const { data, loading, error } = useMaildata()
  const [Data, setData] = useState([])

  useEffect(() => {

    if (!loading) {
      if (data.exceldata.length > 0) {
        
        setData(JSON.parse(data.exceldata))
        
      }

    }
    else if (error) {

      console.error(error)

    }
  }, [loading, error, data])

  return (
    <div className='h-[100%] w-[400px] shadow-lg p-[20px]'>
      {loading ? "Loading..." : <div className='scroller flex flex-col h-full overflow-y-auto gap-[20px]'>
        <div className="flex items-center justify-between">
            <p>Saved data</p>
            <p>{Data.length}</p>
          </div>

          {Data?.map((value, index) => (
            <p
            
              className="maintext flex w-full bg-green-500 p-[7px] items-center rounded-lg text-black shadow-lg gap-[20px]"
              key={index}
            >
             
              {value.From.slice(0, 20)}...
            </p>
          ))}

      </div> }
    </div>
  )
}
