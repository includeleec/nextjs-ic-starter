import React from 'react'
import { useGlobalContext } from 'components/Store/Store'

export default function Home() {
    const {
        state: { isAuthed }
    } = useGlobalContext()

    return <div className="flex flex-col gap-8 pt-8">{isAuthed && <p>authed</p>}</div>
}
