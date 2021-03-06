import React, { useCallback, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'

// Note: This is just a basic example to get you started
function Auth() {
    const [signedIn, setSignedIn] = useState(false)
    const [principal, setPrincipal] = useState('')
    const [client, setClient] = useState()

    const initAuth = async () => {
        const client = await AuthClient.create()
        const isAuthenticated = await client.isAuthenticated()

        setClient(client)

        if (isAuthenticated) {
            const identity = client.getIdentity()
            const principal = identity.getPrincipal().toString()
            setSignedIn(true)
            setPrincipal(principal)
        }
    }

    const signIn = async () => {
        const { identity, principal } = await new Promise((resolve, reject) => {
            client.login({
                identityProvider: 'https://identity.ic0.app',
                onSuccess: () => {
                    const identity = client.getIdentity()
                    const principal = identity.getPrincipal().toString()
                    resolve({ identity, principal })
                },
                onError: reject
            })
        })
        setSignedIn(true)
        setPrincipal(principal)
    }

    const signOut = async () => {
        await client.logout()
        setSignedIn(false)
        setPrincipal('')
    }

    useEffect(() => {
        initAuth()
    }, [])

    return (
        <div className="auth-section">
            {!signedIn && client ? (
                <button onClick={signIn} className="flex p-2 bg-blue-200 btn hover:bg-blue-500">
                    Sign in use II
                </button>
            ) : null}

            {signedIn ? (
                <>
                    <p>Signed in as: {principal}</p>
                    <button
                        onClick={signOut}
                        className="flex p-2 bg-blue-200 btn hover:bg-blue-500">
                        Sign out
                    </button>
                </>
            ) : null}
        </div>
    )
}

export { Auth }
