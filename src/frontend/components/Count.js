import React, { useEffect, useState } from 'react'
// import { makeCounterActor } from 'ui/service/actor-locator'

export function Count({ actor }) {
    const counter = actor

    const [count, setCount] = useState()

    const refreshCounter = async () => {
        const res = await counter.getValue()
        setCount(res.toString())
    }

    useEffect(() => {
        if (counter) {
            refreshCounter()
        }
    }, [])

    const onIncrementClick = async () => {
        if (counter) {
            await counter.increment()
            refreshCounter()
        } else {
            window.alert('login first')
        }
    }

    return (
        <>
            <header className="App-header">
                <button
                    className="p-2 flex btn bg-blue-200 hover:bg-blue-500"
                    onClick={onIncrementClick}>
                    Count is: {count}
                </button>
            </header>
        </>
    )
}
