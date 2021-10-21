import React, { useState, useEffect } from 'react'

import { Auth } from 'components/Auth'
import { CountWho } from 'components/CountWho'

import { PrincipalStatus } from 'components/PrincipalStatus'

import { canisterId as helloCanisterId, idlFactory as helloIdlFactory } from 'canisters/hello'

import {
    canisterId as counterCanisterId,
    idlFactory as counterIdlFactory
} from 'canisters/counter_who'

import { Count } from 'components/Count'

import styles from 'styles/Home.module.css'

function AuthPage() {
    const [connected, setConnected] = useState(false)
    const [principalId, setPrincipalId] = useState('')
    const [actor, setActor] = useState(false)

    const whitelist = [helloCanisterId, counterCanisterId]
    const host = process.env.NEXT_PUBLIC_IC_HOST

    const handleConnect = async () => {
        const connected = await window?.ic?.plug?.isConnected()
        // setConnected(true)

        // Request for the Plug wallet connection
        // which returns a boolean response
        // the requestConnect should create an instance of agent
        await window.ic?.plug?.requestConnect({
            whitelist,
            host
        })

        if (connected && !window.ic.plug.agent) {
            await window.ic.plug.createAgent({ whitelist, host })
        }

        const principal = await window?.ic?.plug?.agent?.getPrincipal()
        const PrincipalId = principal.toText()
        console.log(PrincipalId)
        setPrincipalId(PrincipalId)
        // setPrincipal(principal)

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const counterActor = await window.ic.plug.createActor({
            canisterId: counterCanisterId,
            interfaceFactory: counterIdlFactory
        })
        console.log(`counterCanisterId`, counterCanisterId)
        console.log(`actor`, counterActor)
        setActor(counterActor)
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Auth />

                <div className="border-t-2 border-blue-300 mt-5 w-full">
                    <div className="m-2">
                        <PrincipalStatus principalId={principalId} />

                        <button className="p-2 bg-gray-300 mb-2 mt-2" onClick={handleConnect}>
                            Sign in use Plug
                        </button>

                        <CountWho actor={actor} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AuthPage
