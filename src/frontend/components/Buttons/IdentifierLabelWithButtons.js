import classNames from 'classnames'
import React from 'react'
import { shortAccount, shortPrincipal } from '@/lib/utils'

const defaultRender = ({ rawId, displayId, name }) => {
    const display = name ?? displayId
    // Show raw id as title when using name or short id
    const showTitle = rawId !== display
    return showTitle ? <span title={rawId}>{display}</span> : <>{display}</>
}

export const renderResponsiveShortId = ({ rawId, shortId, displayId, name }) => {
    const display = name ?? displayId
    return (
        <>
            <span className="hidden sm:inline" title={rawId}>
                {display}
            </span>
            <span className="inline sm:hidden" title={rawId}>
                {name ?? shortId}
            </span>
        </>
    )
}

/**
 * @param showName - Show or hide the name, if available
 */
export default function IdentifierLabelWithButtons({
    className,
    type,
    id,
    isShort = false,
    showName = true,
    showButtons = true,
    render = defaultRender
}) {
    const rawId =
        typeof id === 'object' && '_isPrincipal' in id
            ? id.toText()
            : typeof id === 'bigint'
            ? id.toString()
            : typeof id === 'object' && 'id' in id
            ? id.id.toString()
            : id

    let link
    switch (type) {
        case 'Principal':
            link = `https://ic.rocks/principal/${rawId}`
            break
        case 'Account':
            link = `https://ic.rocks/account/${rawId}`
            break
    }

    let name
    if (showName) {
        if (type === 'Principal') name = shortPrincipal(rawId)
        // if (type === 'Neuron') name = neuronName(rawId)
    }

    let shortId
    if (type === 'Principal' || type === 'Account') {
        if (type === 'Principal') shortId = shortPrincipal(rawId)
        else if (type === 'Account') shortId = shortAccount(rawId)
    }

    const displayId = isShort ? shortId ?? rawId : rawId

    return (
        <span className={classNames('break-all leading-tight', className)}>
            {render({ rawId, shortId, displayId, name })}
            
        </span>
    )
}
