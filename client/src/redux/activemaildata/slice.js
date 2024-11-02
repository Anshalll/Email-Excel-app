import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    activemail: null,
}

const Activemaildata = createSlice({
    name: "activemaildata",
    initialState,
    reducers: {
        setactivemaildata : (state, action) => {
            state.activemail = action.payload
        }
    }
})



export const {setactivemaildata} = Activemaildata.actions
export default Activemaildata.reducer