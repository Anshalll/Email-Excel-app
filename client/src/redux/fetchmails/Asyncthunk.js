import { createAsyncThunk } from "@reduxjs/toolkit";


export const Fetchmaildata = createAsyncThunk(
    'mails/fecthmaildata',
    async (page, thunkAPI) => {
   
        try {
          let response = await fetch(`http://localhost:5000/${page}`);
    
          if (!response.ok) {
          
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();
          return data;  
        } catch (error) {
       
          return thunkAPI.rejectWithValue(error.message);
        }
      }
)