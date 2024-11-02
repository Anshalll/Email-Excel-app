import {configureStore} from '@reduxjs/toolkit'
import fetchmaildata from './fetchmails/slice'
import SelectedMails from './SelectedMaildata/slice'
import { Formmutations } from './apis/Api'
import { FormmutationsReducer } from './apis/Api'
import MailsLimit from './mailslimit/slice'
import Activemaildata  from './activemaildata/slice'
import Datasaved from './datasaved/slice'


export const store = configureStore({
    reducer : {
        fetchmaildata: fetchmaildata,
        selectedMails: SelectedMails,
        [Formmutations.reducerPath] : FormmutationsReducer,
        MailsLimit: MailsLimit,
        Activemaildata: Activemaildata,
        Datasaved: Datasaved
    },

    middleware: (getdefaultmiddleware) => 
        getdefaultmiddleware().concat(Formmutations.middleware),
})