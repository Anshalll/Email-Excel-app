import { useSelector } from "react-redux"

export const useActivmaildata = () => {
    const {activemail} = useSelector((state) => state.Activemaildata)

    return {activemail}
}