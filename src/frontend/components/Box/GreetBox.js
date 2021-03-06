import { useState } from 'react';
import { useGreet } from '@/lib/hooks/useGreet'


export default function GreetBox({ name }) {
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
    } = useGreet();


    return <div className="flex flex-col">
        <p className="mb-2">don't need login, can greet</p>
        <button className="px-2 py-1 transition-shadow bg-white rounded-md hover:shadow-lg transition-300" onClick={() => mutate({ name },{
        onSuccess: (data) => {  console.log('mutation success', setRes(data)) },
      })}>greet</button>
      <p className="mt-4">{!isLoading ? data : 'loading'}</p>
 
    </div>

}
