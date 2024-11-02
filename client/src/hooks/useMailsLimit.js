import { useSelector } from "react-redux"

export const useMailsLimit = () => {
    const { limit } = useSelector((state) => state.MailsLimit)
    return {limit}
}