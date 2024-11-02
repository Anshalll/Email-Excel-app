import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    limit: 30,

}

const MailsLimit = createSlice({ 
    name: "setmailLimit",
    initialState,
    reducers: {
        setMailLimit : (state, action ) => {
                state.limit = action.payload
        }
    }
    

})


export const {setMailLimit} = MailsLimit.actions
export default MailsLimit.reducer