import React from 'react'
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
        </nav>
    )
}
