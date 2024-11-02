import { useSelector } from "react-redux"

export const useMailShowdata = () => {

    const {selectedmaildata} = useSelector((state) => state.MailShowdata)
    
    return {selectedmaildata}

}