import { HttpAgent } from '@dfinity/agent'
import { AuthClient } from '@dfinity/auth-client'
import { Ed25519KeyIdentity } from '@dfinity/identity'
import PlugConnect from '@psychedelic/plug-connect'
// import { StoicIdentity } from "ic-stoic-identity";
import React, { useEffect, useState } from 'react'
// import { canisterId as HelloCanisterId } from '@/declarations/hello'
import {
    canisterId as HelloCanisterId,
} from 'declarations/hello'
import { canisterId as WhoamiCanisterId } from '@/declarations/whoami'
import { HOST, IDENTITY_PROVIDER } from '@/lib/canisters'
import { ONE_WEEK_NS } from '@/lib/constants'
import Modal from '@/components/Layout/Modal'
import { useGlobalContext, useSetAgent } from '@/components/Store/Store'

export default function LoginButton() {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const {
        state: { isAuthed }
    } = useGlobalContext()
    const setAgent = useSetAgent()
    const [authClient, setAuthClient] = useState(null)

    // plug call canister whitelist
    const whitelist = [HelloCanisterId, WhoamiCanisterId]

    const handleAuthenticated = async (authClient) => {
        const identity = authClient.getIdentity()
        console.log('identity', identity)

        setAgent({
            agent: new HttpAgent({
                identity,
                host: HOST
            }),
            isAuthed: true
        })
        closeModal()
    }

    const handleIILogin =  () => {

        authClient.login({
            identityProvider: IDENTITY_PROVIDER,
            maxTimeToLive: ONE_WEEK_NS,
            onSuccess: ()=> handleAuthenticated(authClient),
        })

    }

    const handleIILogout = async () => {
        await authClient.logout()
        setAgent({ agent: null })
    }

    const handlePlugLogin = async () => {
        setAgent({
            agent: await window?.ic?.plug?.agent,
            isAuthed: true
        })
        closeModal()
    }

    // const handleStoicLogin = async () => {
    //   StoicIdentity.load().then(async (identity: SignIdentity) => {
    //     if (!identity) {
    //       identity = await StoicIdentity.connect();
    //     }
    //     setAgent({
    //       agent: new HttpAgent({
    //         identity,
    //         host: HOST,
    //       }),
    //       isAuthed: true,
    //     });
    //     closeModal();
    //   });
    // };

    const handleLogout = async () => {
        if (await window?.ic?.plug?.isConnected()) {
            window.ic.plug.agent = null
            setAgent({ agent: null })
        } else {
            handleIILogout()
        }
    }

    // Auth on refresh
    useEffect(() => {
        ;(async () => {
            const authClient = await AuthClient.create()
            setAuthClient(authClient)

            if (process.env.NEXT_PUBLIC_IDENTITY_OVERRIDE_SECRET_KEY) {
                // direct ed25519 pk identity
                const identity = Ed25519KeyIdentity.fromSecretKey(
                    Buffer.from(process.env.NEXT_PUBLIC_IDENTITY_OVERRIDE_SECRET_KEY, 'hex')
                )
                setAgent({
                    agent: new HttpAgent({
                        identity,
                        host: HOST
                    }),
                    isAuthed: true
                })
            } else if (await window?.ic?.plug?.isConnected()) {
                // const connected = await window?.ic?.plug?.isConnected();
                // if (!connected) await window.ic.plug.requestConnect({ whitelist, host });
                if (!window.ic.plug.agent) {
                    await window.ic.plug.createAgent({
                        whitelist,
                        host: HOST
                    })
                }
                handlePlugLogin()
            } else {
                if (await authClient.isAuthenticated()) {
                    handleAuthenticated(authClient)
                }
            }
        })()
    }, [])
    return (
        <>
            <button
                className="px-2 py-1 transition-shadow bg-white rounded-md hover:shadow-lg transition-300"
                onClick={isAuthed ? handleLogout : openModal}>
                {isAuthed ? 'Logout' : 'Login'}
            </button>
            <Modal
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
                title="Login"
                className="w-52">
                <div className="flex flex-col items-stretch gap-4">
                    <button
                        className="flex items-center px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                        onClick={handleIILogin}>
                        <img src="/img/dfinity.png" className="w-4 mr-2" /> Internet Identity
                    </button>

                    <PlugConnect
                        whitelist={whitelist}
                        host={HOST}
                        onConnectCallback={handlePlugLogin}
                    />
                </div>
            </Modal>
        </>
    )
}
