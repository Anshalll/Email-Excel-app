import {configureStore} from '@reduxjs/toolkit'
import fetchmaildata from './fetchmails/slice'


export const store = configureStore({
    reducer : {
        fetchmaildata: fetchmaildata,
    }
})