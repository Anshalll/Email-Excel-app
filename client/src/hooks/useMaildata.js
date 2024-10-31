import { useSelector } from "react-redux"

export const useMaildata = () => {
        const {data, loading, error}  = useSelector((state) => state.fetchmaildata)

        return {data, loading , error}
}