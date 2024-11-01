import { useSelector } from "react-redux";


export const useSelectedmailsdata = () => {
    
    const  {selected , loading} = useSelector((state) => state.selectedMails)

    return {selected , loading}

}