import { createAsyncThunk } from "@reduxjs/toolkit";

export const Fetchmaildata = createAsyncThunk(
    'mails/fetchmaildata',
    async (data, thunkAPI) => {
        try {
            let response = await fetch(`http://localhost:5000/${data.page}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.limit)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            return result;  
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
