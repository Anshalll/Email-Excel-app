import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {setMailLimit} from '../redux/mailslimit/slice'
import { useMailsLimit } from '../hooks/useMailsLimit';
import { Fetchmaildata } from '../redux/fetchmails/Asyncthunk';


export default function Navbar() {

  const {limit} = useMailsLimit()
  const dispatch = useDispatch()


  const [SettingState , setSettingState] = useState(false)


  const SettingClicked = () => {
    setSettingState(!SettingState)
  }

  return (

    <nav className="flex w-full items-center h-full shadow-lg justify-between px-[20px]">

        <p className='mainTitle'>Coded by - Anshal</p>
      <div className='flex items-center gap-[20px]'>

      <button onClick={() => dispatch(Fetchmaildata({ page: "/" , limit:  limit })) } className='bg-[chartreuse] px-[30px] py-[7px] rounded-lg text-black'>Refetch</button>

        <div className='relative'>

          <button onClick={() => SettingClicked()}>

            <SettingsOutlinedIcon />

          </button>
          {SettingState && <div className='absolute right-[10px] rounded-lg flex flex-col gap-[20px] top-[45px] bg-gray-900 p-[10px]'>
              <p className='text-white'>Limit</p>
              <input type="number" value={limit} className='px-[10px]'  onChange={(e) => dispatch(setMailLimit(e.target.value))} />
          </div> }
        </div>

      </div>
    </nav>
  );
}
