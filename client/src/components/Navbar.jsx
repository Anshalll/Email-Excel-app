import React, { useState } from 'react';
import { useUploadToExcelMutation } from '../redux/apis/Api'
import { useSelectedmailsdata } from '../hooks/useSelectedmails';


export default function Navbar() {

  const { selected } = useSelectedmailsdata()
  const [Formmutation] = useUploadToExcelMutation()
  const [Error, setError] = useState("")
  const [Success, setSuccess] = useState()

  const Handleupload = async () => {
    const rcvd_resp = await Formmutation({ path: '/uploadexcel', method: "POST", data: { data: selected } })
    if (rcvd_resp.error) {
      console.error("An error occured!")
      setError("An error occured!")
    }
    else if (rcvd_resp.data) {
      setError("")
      setSuccess("Uploaded to excel!")
  
    }
  }

  return (

    <nav className="flex w-full items-center h-full shadow-lg justify-between px-[20px]">
      <img
        src="https://images.tribuneindia.com/cms/gall_content/2019/4/2019_4$largeimg15_Monday_2019_083425749.jpg"
        alt="loading"
        className="w-[60px] h-[60px] object-cover object-center rounded-full"
      />
      <div className='flex items-center gap-[20px]'>

        {Error !== "" && <p className='text-red-500 shadow-md'>{Error}</p>}

        {Success !== "" && <p className='text-green-500 shadow-md'>{Success}</p>}

        <button disabled={!selected.length > 0} onClick={() => Handleupload()} className={`${selected.length > 0  ? "opacity-1" : "opacity-[0.7]" } bg-[crimson] text-white px-[30px] py-[10px] rounded-lg border-2 border-black`}>
          Save
        </button>
      </div>
    </nav>
  );
}
