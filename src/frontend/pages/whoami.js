
import { useState } from 'react'
import { useGlobalContext } from '@/components/Store/Store'
import WhoamiBox from '@/components/Box/WhoamiBox'

export default function Whoami() {

    const {
        state: { principal,isAuthed }
    } = useGlobalContext()



    const [name, setName] = useState('')

    function handleOnChangeName(e) {
        setName(e.target.value)
    }



    // principal must transfer to raw principal id can show
    const rawId = principal && (typeof principal === 'object' && '_isPrincipal' in principal
    ? principal.toText()
    : typeof principal === 'bigint'
    ? principal.toString()
    : typeof principal === 'object' && 'id' in principal
    ? principal.id.toString()
    : principal)
        

    console.log(`principal:${principal}`)

    return <div className="flex flex-col">
            <h2>who am i?</h2>
            <p className="my-2">principal: {rawId}</p>

            {isAuthed && <p>authed</p>}
            <input type="text" onChange={handleOnChangeName} value={name} />
            <WhoamiBox name={name} />
    </div>
}