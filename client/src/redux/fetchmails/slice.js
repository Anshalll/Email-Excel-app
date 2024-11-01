import { createSlice } from "@reduxjs/toolkit";
import { Fetchmaildata } from "./Asyncthunk";

let initialState = {
    data: {},
    loading: true,
    error: null
}

const fetchmaildata = createSlice({
    
    name: "fetchmaildata",
    initialState,

    reducers: { 
        setMaildata: (state, action) => {
            state.data = action.payload
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Fetchmaildata.pending , (state) => {
                state.loading = true;
            })
            .addCase(Fetchmaildata.fulfilled, (state , action) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(Fetchmaildata.rejected , (state ,  action) => {
                state.loading = false
                state.error = action.error
            })
    }


})

export const { setMaildata  } = fetchmaildata.actions
export default fetchmaildata.reducer