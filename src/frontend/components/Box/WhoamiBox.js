import { useState } from 'react';
import { useWhoareyou } from '@/lib/hooks/useWhoami'


export default function WhoamiBox({ name }) {
    const [res,setRes] = useState()


    const {
      data,
      error,
      isError,
      isIdle,
      isLoading,
      isPaused,
      isSuccess,
      mutate,
      mutateAsync,
      reset,
      status,
    } = useWhoareyou();


    return <div className="flex flex-col">
        <p className="my-2">need login, can call</p>
        <button className="px-2 py-1 transition-shadow bg-white rounded-md hover:shadow-lg transition-300" onClick={() => mutate({ name },{
        onSuccess: (data) => {  console.log('mutation success', setRes(data)) },
      })}>call who are you</button>
      <p className="mt-4">{!isLoading ? data : 'loading'}</p>
 
    </div>

}
