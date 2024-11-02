import React, { useEffect, useState } from 'react'
import { useMaildata } from '../hooks/useMaildata'
import { useDispatch } from 'react-redux';
import { setactivemaildata } from '../redux/activemaildata/slice';
import Loading from './Loading'

export default function Sidebar2() {

  const { data, loading, error } = useMaildata()
  const [Data, setData] = useState([])
  const dispatch = useDispatch();
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


  const HandleSelectedmail = (type, value) => {

    const data = { type, value }
    dispatch(setactivemaildata(data))

  }

  return (
    <div className='h-[100%] w-[400px] shadow-lg p-[20px]'>
      {loading ? <div className='w-full h-full flex items-center justify-center'>

        <Loading width={30} height={30} />
      </div> : <div className='scroller flex flex-col h-full overflow-y-auto gap-[20px]'>
        <div className="flex items-center justify-between">
          <p>Saved data</p>
          <p>{Data.length}</p>
        </div>

        {Data?.map((value, index) => (


          <button
            onClick={() => HandleSelectedmail("saved", value)}
            className="maintext flex w-full bg-green-500 p-[7px] items-center rounded-lg text-black shadow-lg gap-[20px]"
            key={index}
          >

            {value.From.slice(0, 20)}...
          </button>

        ))}

      </div>}
    </div>
  )
}
