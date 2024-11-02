import React, { useState } from 'react';
import { useUploadToExcelMutation } from '../redux/apis/Api'
import { useSelectedmailsdata } from '../hooks/useSelectedmails';
import { setMaildata } from '../redux/fetchmails/slice'
import { useDispatch } from 'react-redux';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {setMailLimit} from '../redux/mailslimit/slice'
import { useMailsLimit } from '../hooks/useMailsLimit';
export default function Navbar() {
  const {limit} = useMailsLimit()
  const dispatch = useDispatch()
  const { selected } = useSelectedmailsdata()
  const [Formmutation] = useUploadToExcelMutation()
  const [Error, setError] = useState("")
  const [Success, setSuccess] = useState()
  const [ButtonSave, setButtonSave] = useState(true)
  const [SettingState , setSettingState] = useState(false)

  const Handleupload = async () => {
    setButtonSave(false)
    const rcvd_resp = await Formmutation({ path: '/uploadexcel', method: "POST", data: { data: selected , limit: limit} })
    if (rcvd_resp.error) {
      setButtonSave(true)

      console.error("An error occured!")
      setError("An error occured!")
      setTimeout(() => {
        setError("")
      }, 3000)
    }
    else if (rcvd_resp.data) {

      setButtonSave(true)

      const inputfiled = document.querySelectorAll(".inputcheckbox")

      inputfiled.forEach(checkbox => checkbox.checked = false)

      dispatch(setMaildata(rcvd_resp.data))
      setSuccess("Uploaded to excel!")
      setTimeout(() => {
        setSuccess("")
      }, 3000)
    }
  }

  const SettingClicked = () => {
    setSettingState(!SettingState)
  }

  return (

    <nav className="flex w-full items-center h-full shadow-lg justify-between px-[20px]">

      <img
        src="https://images.tribuneindia.com/cms/gall_content/2019/4/2019_4$largeimg15_Monday_2019_083425749.jpg"
        alt="loading"
        className="w-[60px] h-[60px] object-cover object-center rounded-full"
      />
      <div className='flex items-center gap-[20px]'>

        {Error !== "" && <p className='text-red-500  bg-black'>{Error}</p>}

        {Success !== "" && <p className='text-green-500  bg-black'>{Success}</p>}

        {ButtonSave ? <button disabled={!selected.length > 0} onClick={() => Handleupload()} className={`${selected.length > 0 ? "opacity-1" : "opacity-[0.7]"} bg-[crimson] text-white px-[30px] py-[10px] rounded-lg border-2 border-black`}>
          Save
        </button> : "Loading..."}

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
