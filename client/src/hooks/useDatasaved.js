import { useSelector } from "react-redux"

export const useDatasaved = () => {
    const {saved} = useSelector((state) => state.Datasaved)
    return {saved}
}