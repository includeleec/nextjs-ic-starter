import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/components/Store/Store'
import GreetBox from '@/components/Box/GreetBox'




export default function Home() {
    const {
        state: { isAuthed }
    } = useGlobalContext()

    const [name, setName] = useState('')

    function handleOnChangeName(e) {
        setName(e.target.value)
    }


    return (
        <div className="flex flex-col gap-8 pt-8">
            {isAuthed && <p>authed</p>}
            <input type="text" onChange={handleOnChangeName} value={name} />
            <GreetBox name={name} />
        </div>
    )
}
