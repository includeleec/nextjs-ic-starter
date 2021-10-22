import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { defaultAgent } from 'lib/canisters'

import { canisterId as helloCanisterId, createActor as createHelloActor } from 'declarations/hello'

import {
    canisterId as whoamiCanisterId,
    createActor as createWhoamiActor
} from 'declarations/whoami'

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AGENT':
            console.log('agent', action.agent)
            const agent = action.agent || defaultAgent

            // Fetch root key for certificate validation during development
            // if (process.env.NEXT_PUBLIC_DFX_NETWORK === 'local') {
            //     agent.fetchRootKey()
            // }

            return {
                ...state,
                agent,
                hello: createHelloActor(helloCanisterId, agent),
                whoami: createWhoamiActor(whoamiCanisterId, agent),
                isAuthed: !!action.isAuthed
            }
        case 'SET_PRINCIPAL':
            return {
                ...state,
                principal: action.principal
            }
        case 'LOAD_PERSISTENT_STATE':
            return {
                ...state,
                persistent: action.value
            }
        case 'SET_HIDE_ZERO_BALANCES':
            return {
                ...state,
                persistent: {
                    ...state.persistent,
                    hideZeroBalances: action.value
                }
            }
    }
}

const initialState = {
    agent: defaultAgent,
    hello: createHelloActor(helloCanisterId, defaultAgent),
    whoami: createWhoamiActor(whoamiCanisterId, defaultAgent),
    isAuthed: false,
    principal: null,
    persistent: {
        hideZeroBalances: true
    }
}

const Context = createContext({
    state: initialState,
    dispatch: (_) => null
})

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        try {
            const stored = localStorage.getItem('state')
            if (stored) {
                const value = JSON.parse(stored)
                dispatch({ type: 'LOAD_PERSISTENT_STATE', value })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('state', JSON.stringify(state.persistent))
        }
    }, [state.persistent])

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export const useGlobalContext = () => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a CountProvider')
    }
    return context
}

export const useHello = () => {
    const context = useGlobalContext()
    return context.state.hello
}

export const useWhoami = () => {
    const context = useGlobalContext()
    return context.state.whoami
}

export const useHideZeroBalances = () => {
    const context = useGlobalContext()

    const state = context.state.persistent.hideZeroBalances
    const dispatch = (value) => context.dispatch({ type: 'SET_HIDE_ZERO_BALANCES', value })

    return [state, dispatch]
}

export const useSetAgent = () => {
    const { dispatch } = useGlobalContext()

    return async ({ agent, isAuthed }) => {
        dispatch({ type: 'SET_AGENT', agent, isAuthed })
        if (isAuthed) {
            const principal = await agent.getPrincipal()
            console.log('authed', principal.toText())

            dispatch({
                type: 'SET_PRINCIPAL',
                principal
            })
        } else {
            dispatch({ type: 'SET_PRINCIPAL', principal: null })
        }
    }
}

export default Store
