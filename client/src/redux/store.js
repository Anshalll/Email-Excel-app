import {configureStore} from '@reduxjs/toolkit'
import fetchmaildata from './fetchmails/slice'
import SelectedMails from './SelectedMaildata/slice'
import { Formmutations } from './apis/Api'
import { FormmutationsReducer } from './apis/Api'

export const store = configureStore({
    reducer : {
        fetchmaildata: fetchmaildata,
        selectedMails: SelectedMails,
        [Formmutations.reducerPath] : FormmutationsReducer
        
    },

    middleware: (getdefaultmiddleware) => 
        getdefaultmiddleware().concat(Formmutations.middleware),
})