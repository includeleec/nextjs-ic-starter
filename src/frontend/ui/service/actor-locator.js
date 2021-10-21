import { createActor as createHelloActor, canisterId as helloCanisterId } from 'canisters/hello'

import {
    createActor as createCounterActor,
    canisterId as CounterCanisterId
} from 'canisters/counter'

import {
    createActor as createCounterWhoActor,
    canisterId as CounterWhoCanisterId
} from 'canisters/counter_who'

export const makeActor = (canisterId, createActor) => {
    return createActor(canisterId, {
        agentOptions: {
            host: process.env.NEXT_PUBLIC_IC_HOST
        }
    })
}

export function makeHelloActor() {
    return makeActor(helloCanisterId, createHelloActor)
}

export function makeCounterActor() {
    return makeActor(CounterCanisterId, createCounterActor)
}

export function makeCounterWhoActor() {
    return makeActor(CounterWhoCanisterId, createCounterWhoActor)
}
