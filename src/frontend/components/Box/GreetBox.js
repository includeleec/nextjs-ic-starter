import { useState } from 'react';
import { useGreet } from '@/lib/hooks/useGreet'

import { useHello } from '@/components/Store/Store'

export default function GreetBox({ name }) {
    const [res,setRes] = useState()
    const greet = useGreet();

    // const hello = useHello()

    // async function handleGreet() {
    //     const result = await hello.greet('ddd');
    //     console.log(result)
    // }

    return <div className="flex flex-col">
        {/* {greet.data} */}
        <button className="px-2 py-1 transition-shadow bg-white rounded-md hover:shadow-lg transition-300" onClick={() => greet.mutate({ name },{
        onSuccess: (data) => {  console.log('mutation success', setRes(data)) },
      })}>greet</button>
      <p className="mt-4">{greet.data}</p>
        {/* <button className="px-2 py-1 mx-4 transition-shadow bg-white rounded-md hover:shadow-lg transition-300" onClick={handleGreet}>greet</button> */}
    </div>

}
