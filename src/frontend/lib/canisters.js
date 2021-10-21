import { HttpAgent } from '@dfinity/agent'
import { canisterId as helloCanisterId, createActor as createHelloActor } from 'declarations/hello'

import { canisterId as whoamiCanisterId, createActor as createWhoamiActor } from 'declarations/whoami'

export const HOST =
    process.env.NEXT_PUBLIC_DFX_NETWORK === 'local' ? 'http://localhost:8000' : 'https://ic0.app'

export const IDENTITY_PROVIDER =
    process.env.NEXT_PUBLIC_DFX_NETWORK === 'local'
        ? 'http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000'
        : undefined

export const defaultAgent = new HttpAgent({
    host: HOST
})

export const helloActor = createHelloActor(helloCanisterId, defaultAgent)

export const whoamiActor = createWhoamiActor(whoamiCanisterId, defaultAgent)
