import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fetchmaildata } from '../redux/fetchmails/Asyncthunk';
import { useMaildata } from '../hooks/useMaildata';
import { setSelectedmailsdata } from '../redux/SelectedMaildata/slice';
import {useMailsLimit} from '../hooks/useMailsLimit'
export default function Sidebar1() {
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

    dispatch(setSelectedmailsdata(SelectedMails))

  }, [SelectedMails, dispatch])

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

  return (
    <div className="h-[100%] w-[400px] shadow-lg p-[20px]">
      {loading ? (
        'Loading'
      ) : (
        <div className="scroller flex flex-col h-full overflow-y-auto gap-[20px]">
          <button onClick={() => dispatch(Fetchmaildata({ page: "/" , limit:  limit })) } className='bg-[chartreuse] p-[7px] rounded-lg text-black'>Refetch</button>
          <div className="flex items-center justify-between">
            <p>Unsaved data {data?.data?.length}</p>
            <p>Selected {SelectedMails.length}</p>
          </div>
          {data?.data?.map((value, index) => (
            <p
              id="unsaved"
              className="maintext flex w-full bg-yellow-500 p-[7px] items-center rounded-lg text-black shadow-lg gap-[20px]"
              key={index}
            >
              <input
                
                onChange={(e) => HandleSelected(e, value.Messageid)}
                className="inputcheckbox rounded-lg bg-gray-900 w-[15px] h-[15px]"
                type="checkbox"
                name="selected-message"
                id={value.messageid}
              />{' '}
              {value.From.slice(0, 20)}...
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
