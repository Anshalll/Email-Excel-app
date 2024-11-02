import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    saved: false,

}

const Datasaved = createSlice({ 
    name: "datasaved",
    initialState,
    reducers: {
        setdatasaved : (state , action) => {
                state.saved =  action.payload
        }
    }
    

})


export const {setdatasaved} = Datasaved.actions
export default Datasaved.reducer