import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    selected: [],
    loading: true,

}

const SelectedMails = createSlice({
    name: "selectedmails",
    initialState,


    reducers: {
        setSelectedmailsdata : (state, action) => {
            state.selected = action.payload
            state.loading = false
        }
    }

})


export const { setSelectedmailsdata } = SelectedMails.actions
export default SelectedMails.reducer