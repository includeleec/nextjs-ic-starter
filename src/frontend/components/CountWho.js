import React, { useEffect, useState } from 'react'
// import { makeCounterActor } from 'ui/service/actor-locator'

export function CountWho({ actor }) {
    const counter = actor

    const [count, setCount] = useState()
    const [lastCaller, setLastCaller] = useState()

    const refreshCounter = async () => {
        const res = await counter.read()
        setCount(res.toString())
    }

    useEffect(() => {
        if (counter) {
            refreshCounter()
        }
    }, [])

    const onIncrementClick = async () => {
        if (counter) {
            await counter.inc()
            refreshCounter()
        } else {
            window.alert('login first')
        }
    }

    const onGetLastCaller = async () => {
        const lc = await counter.getLastCaller()
        setLastCaller(lc)
    }

    return (
        <>
            <header className="App-header">
                <button
                    className="p-2 flex btn bg-blue-200 hover:bg-blue-500"
                    onClick={onIncrementClick}>
                    Who Count is: {count}
                </button>

                <p>last caller: {lastCaller}</p>
            </header>
        </>
    )
}
