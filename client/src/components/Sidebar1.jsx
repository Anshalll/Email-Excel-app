import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fetchmaildata } from '../redux/fetchmails/Asyncthunk';
import { useMaildata } from '../hooks/useMaildata';
import { setSelectedmailsdata } from '../redux/SelectedMaildata/slice';
import {useMailsLimit} from '../hooks/useMailsLimit'
import { setactivemaildata } from '../redux/activemaildata/slice';
import {useDatasaved} from '../hooks/useDatasaved'
import Savebutton from './Savebutton';
import Loading from './Loading';

export default function Sidebar1() {
  
  const {saved} = useDatasaved()
  const [SelectedMails, setSelectedMails] = useState([]);
  const { data, loading, error } = useMaildata();
  const {limit} = useMailsLimit()
  const dispatch = useDispatch();



  useEffect(() => {


    if (loading) {
      dispatch(Fetchmaildata({ page: "/" , limit:  limit }));
    } else if (error) {
      console.error(error);
    }

  }, [dispatch, loading, error , limit]);

  useEffect(() => {


      
      dispatch(setSelectedmailsdata(SelectedMails));

    
  }, [SelectedMails,  dispatch]);

  useEffect(() => {
    if (saved) {
   
      setSelectedMails([])
      dispatch(setSelectedmailsdata([]))
    }
  } , [saved , dispatch])

  const HandleSelected = (e, id) => {

    if (e.target.checked) {

      const findings = data?.data?.filter((item) => item.Messageid === id);
      

      if (findings) {

        setSelectedMails((prev) => [...prev, findings[0]])

      }

    }
    else {

      let findings = SelectedMails.filter((e) => e.Messageid !== id)
      setSelectedMails(findings)

    }
  }
  

  const HandleSelectedmail = (type , value) => {

    const data = {type, value}
    dispatch(setactivemaildata(data))

  }

  return (
    <div className="h-[100%] w-[400px] shadow-lg p-[20px]">
      {loading ? (
        <div className='w-full h-full flex items-center justify-center'>

        <Loading width={30} height={30}/>
        </div>
      ) : (
        <div className="scroller flex flex-col h-full overflow-y-auto gap-[20px]">
         
          <Savebutton setSelectedMails={setSelectedMails}/>
          <div className="flex items-center justify-between">
            <p>Unsaved data {data?.data?.length}</p>
            <p>Selected {SelectedMails.length}</p>
          </div>
          {data?.data?.map((value, index) => (
            <div key={index} className=' flex w-full bg-yellow-500 p-[7px] items-center rounded-lg text-black shadow-lg gap-[20px]'>
           <input
                
                onChange={(e) => HandleSelected(e, value.Messageid)}
                className="inputcheckbox rounded-lg bg-gray-900 w-[15px] h-[15px]"
                type="checkbox"
                name="selected-message"
                id={value.messageid}
              />
            <button
              id="unsaved"
              className="maintext "
        
              onClick={() => HandleSelectedmail("unsaved" , value)}
            >
              
              {value.From.slice(0, 20)}...
            </button>
 

            </div>

          ))}
        </div>
      )}
    </div>
  );
}
