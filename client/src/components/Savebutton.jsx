import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelectedmailsdata } from '../hooks/useSelectedmails';
import { useUploadToExcelMutation } from '../redux/apis/Api'
import { setSelectedmailsdata } from '../redux/SelectedMaildata/slice';
import { useMailsLimit } from '../hooks/useMailsLimit';
import { setMaildata } from '../redux/fetchmails/slice';
import Loading from './Loading'
export default function Savebutton({ setSelectedMails }) {

    const [ButtonSave, setButtonSave] = useState(true)
    const { selected } = useSelectedmailsdata()
    const [Formmutation] = useUploadToExcelMutation()
    const [Error, setError] = useState("")
    const [Success, setSuccess] = useState("")
    const { limit } = useMailsLimit()

    const dispatch = useDispatch()

    const Handleupload = async () => {
        setButtonSave(false)
        const rcvd_resp = await Formmutation({ path: '/uploadexcel', method: "POST", data: { data: selected, limit: limit } })
        if (rcvd_resp.error) {

            setButtonSave(true)

            setError("An error occured!")

            setTimeout(() => {
                setError("")
            }, 3000)

        }
        else if (rcvd_resp.data) {

            setButtonSave(true)

            const inputfiled = document.querySelectorAll(".inputcheckbox")

            inputfiled.forEach(checkbox => checkbox.checked = false)


            setSelectedMails([])

            dispatch(setSelectedmailsdata([]))

            dispatch(setMaildata(rcvd_resp.data))

            setSuccess("Uploaded to excel!")

            setTimeout(() => {
                setSuccess("")
            }, 3000)

        }
    }


    return (
        <>
            {Error !== "" && <p className='text-red-500 p-[7px] rounded-lg bg-black'>{Error}</p>}

            {Success !== "" && <p className='text-green-500 p-[7px] rounded-lg bg-black'>{Success}</p>}
            
            {ButtonSave ? <button disabled={!selected.length > 0} onClick={() => Handleupload()} className={`${selected.length > 0 ? "opacity-1" : "opacity-[0.7]"} bg-[crimson] text-white px-[30px] py-[10px] rounded-lg border-2 border-black`}>
                Save
            </button> : <div className='w-full h-full flex items-center justify-center'>

                <Loading width={20} height={20} />

            </div>
            }
        </>

    )
}
