import React from 'react'
import Link from 'next/link'
import IdentifierLabelWithButtons from '@/components/Buttons/IdentifierLabelWithButtons'
import LoginButton from '@/components/Buttons/LoginButton'
import { useGlobalContext } from '@/components/Store/Store'

export default function Nav() {
    const {
        state: { principal }
    } = useGlobalContext()

    return (
        <nav className="flex flex-col items-center justify-between py-4 border-b border-black sm:flex-row border-opacity-10">
            <div className="flex items-center gap-4">
                {principal && !principal.isAnonymous() && (
                    <div className="flex flex-col">
                        <IdentifierLabelWithButtons
                            type="Principal"
                            id={principal}
                            isShort={true}
                            showName={false}
                        />
                    </div>
                )}
                <LoginButton />
            </div>
            <div className="flex">
                <Link href="/">
                    <button className="px-2 py-2 mx-2 bg-white">home</button>
                </Link>
                <Link href="whoami">
                    <button className="px-2 py-2 mx-2 bg-white">who am i</button>
                </Link>
            </div>
        </nav>
    )
}
